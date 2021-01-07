const mysql = require('mysql2');
const viewQuestions = require('./questions');
const cTable = require('console.table');

const sqlpass = 'password'

//Connect to database
const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'newUser',
    password: sqlpass,
    database: 'employee',
    waitForConnections: true,
    connectionLimit: 60,
    queueLimit:0
});

const connectToDatabase = () => {
    return pool.getConnection(function(err) {
        if(err) {
            console.log('error connecting:' + err.stack);
            return;
        }
        console.log('connected to database ' + pool.config.connectionConfig.database);
    });
};


//Database Queries//

//View everything in departments
const viewDepartments = () => {
    return new Promise((res, rej) => {
    pool.query(`
    SELECT * FROM departments`, 
    (err, results, _fields) => {
        if(err) console.log(err);
            res(console.table(results))
        });
    });
};

//View Role Name
const roleUpdate = () => {
    return new Promise((res, rej) => {
        pool.query(`
        SELECT *
        FROM roles
        `,
        (err, results, _fields) => {
            if(err) console.log(err)
            let array = [];
            for(let i= 0; i < results.length; i++) {
                array.push(results[i].title);
            }
            console.log(array);
            res(array);
        });
    });
};

//View Role
const viewRoles = () => {
    return new Promise((res, rej) => {
        pool.query(`
        SELECT roles.id, roles.title, roles.salary, departments.id, departments.name AS department
        FROM roles
        RIGHT JOIN departments
        ON (roles.department_id = departments.id)
        `,
        (err, results, _fields) => {
            if(err) console.log(err);
            res(console.table(results))
        });
    });
};

//Select only employees first and last name
const employeeChoices = () => {
    return new Promise ((res, rej) => {
        pool.query(`
        SELECT CONCAT(first_name, last_name) AS name
        FROM employees
        `, (err, results, _fields) => {
            if(err) console.log(err);
            let array = [];
            for(let i = 0; i < results.length; i++) {
                array.push(results[i].name);
            };
            console.log(array);
            res(array);
        });
    });
};

//view Employees
const viewEmployees = () => {
    return new Promise((res, rej) => {
        pool.query(`
        SELECT e1.id, e1.first_name, e1.last_name, CONCAT(e2.first_name, e2.last_name) AS manager, roles.title, roles.salary, departments.name AS department
        FROM employees e1
        LEFT JOIN employees e2
        ON (e1.manager_id = e2.id)
        RIGHT JOIN roles
        ON (e1.role_id = roles.id)
        RIGHT JOIN departments
        ON (roles.department_id = departments.id)`,
        (err, results, _fields) => {
            if(err) console.log(err);
            res(console.table(results))
        });
    });
};

//Add Department
const addDept = (name) => {
    return new Promise((res, rej) => {
        pool.execute(`
        INSERT INTO departments (name)
        VALUES
        (?)
        `,[name],
        (err, results, _fields) => {
            if(err) console.log(err);
            res(console.table(results))
        });
    });
};

//view the current available roles
const roleChoices = () => {
    return new Promise((res, rej) => {
    pool.query(`
    SELECT * FROM roles`,
    (err, results, _fields) => {
        if (err) console.log(err);
        let array = [];
        for (let i = 0; i < results.length; i++) {
            array.push(results[i].title);
        };
        res(array);
        });
    });
};

//view the current managers
const managerChoices = () => {
    return new Promise((res, rej) => {
        pool.query(`
        SELECT * FROM employees
        WHERE manager_id IS NULL
        `, 
        (err, results, _fields) => {
            if(err) console.log(err);
            let array = [];
            for (let i = 0; i < results.length; i++) {
                array.push(results[i].first_name);
            };
            console.log(array);
            res(array);
        });
    });
};

//search for the primary key of the manager.
const uniqueManager = (data) => {
    return new Promise((res, rej) => {
        pool.query(`
        SELECT id FROM employees
        WHERE employees.first_name = ?
        `,[data.manager],
        (err, results, _fields) => {
            if(err) console.log(err);
            let manager_id = results.map(data => data.id);
            let id = manager_id[0];
            console.log(id);
            res(id);
        });
    });
};

//search for the primary key of the employee
const uniqueEmployee = (data) => {
    return new Promise((res, rej) => {
        pool.query(`
        SELECT id FROM employees
        WHERE CONCAT(employees.first_name, employees.last_name) = ?
        `, [data.employee],
        (err, results, _fields) => {
            if(err) console.log(err);
            let employee_id = results.map(data => data.id);
            let id = employee_id[0];
            console.log(id);
            res(id);
        });
    });
};

//view Departments for inquirer selection
const departmentChoices = () => {
    return new Promise((res, rej) => {
    pool.query(`
    SELECT * FROM departments`, 
    (err, results, _fields) => {
        if(err) console.log(err);
            let array = [];
            for (let i = 0; i < results.length; i++) {
                array.push(results[i].name);
            };
            console.log(array);
            res(array);
        });
    });
};

//search for the primary key of the seleceted department
const unqiueDept = (data) => {
    return new Promise((res, rej) => {
        pool.execute(`
        SELECT id
        FROM departments
        WHERE departments.name = ?
        `,[data.department_selection],
        (err, results, _fields) => {
            if(err) console.log(err);
            let dept_id = results.map(data => data.id);
            let id = dept_id[0];
            console.log(id);
            res(id);
        });
    });
};

//Searches for id of selected role
const uniqueRole = (data) => {
    return new Promise((res, rej) => {
        pool.execute(`
        SELECT id
        FROM roles
        WHERE roles.title = ?
        `,[data.role],
        (err, results, _fields) => {
            if(err) console.log(err);
            let role_id = results.map(data => data.id);
            let id = role_id[0];
            console.log(id);
            res(id);
        })
    })
}

//Adds Role name, salary & Dept.
const addRole = (name, salary, dept) => {
    return new Promise((res, rej) => {
        pool.execute(`
        INSERT INTO roles (title, salary, department_id)
        VALUES
        (?, ?, ?)
        `,[name, salary, dept],
        (err, results, _fields) => {
            if(err) console.log(err);
            res(console.table(results));
        });
    });
};

//Adds Employee
const addEmployee = (first_name, last_name, manager_id, role_id) => {
    return new Promise((res, rej) => {
        pool.execute(`
        INSERT INTO employees (first_name, last_name, manager_id, role_id)
        VALUES (?, ?, ?, ?)
        `,[first_name, last_name, manager_id, role_id],
        (err, results, _fields) => {
            if(err) console.log(err);
            res(console.table(results));
        });
    });
};

//Updates the employees Role
const finalUpdate = (role, name) => {
    console.log(role, name);
    return new Promise((res, rej) => {
        pool.execute(`
        UPDATE employee.employees SET role_id = ? WHERE (id = ?)
        `, [name, role],
        (err, results, _fields) => {
            if(err) console.log(err);
            res(console.table(results));
        });
    });
};

//Deletes the employees based on id
const deleteEmployee = (name) => {
    return new Promise((res, rej) => {
        pool.execute(`
        DELETE FROM employee.employees WHERE (id = ?)
        `,[name],
        (err, results, _fields) => {
            if(err) console.log(err);
            res(console.table(results));
        });
    });
};


module.exports =  {connectToDatabase, viewDepartments, viewRoles, viewEmployees, addDept, departmentChoices, unqiueDept, addRole, roleChoices, managerChoices, uniqueManager, addEmployee, uniqueRole, employeeChoices, roleUpdate, uniqueEmployee, finalUpdate, deleteEmployee};

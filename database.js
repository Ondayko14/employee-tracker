const mysql = require('mysql2');
const viewQuestions = require('./questions');
const cTable = require('console.table');

//Connect to database
const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Ilovedick69inmamouff$',
    database: 'employee',
    waitForConnections: true,
    connectionLimit: 10,
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
        })
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

//view Employees
const viewEmployees = () => {
    return new Promise((res, rej) => {
        pool.query(`
        SELECT e1.id, e1.first_name, e1.last_name, CONCAT(e2.first_name, e2.last_name) AS manager
        FROM employees e1
        LEFT JOIN employees e2
        ON (e1.manager_id = e2.id)
        `,
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

//search for the primary key of the sleceted department
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
module.exports =  {connectToDatabase, viewDepartments, viewRoles, viewEmployees, addDept, departmentChoices, unqiueDept, addRole};

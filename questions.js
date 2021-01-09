const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const {viewDepartments, connectToDatabase, viewRoles, viewEmployees, addDept, departmentChoices, unqiueDept, addRole, roleChoices, managerChoices, uniqueManager, addEmployee, uniqueRole, employeeChoices, roleUpdate, uniqueEmployee, finalUpdate, deleteEmployee, sendInformation} = require('./database');
//const {generateHtml} = require('./assets/js/generateHtml');
const {writeFile} = require('./assets/js/writeToPage');
//Ask Questions
const viewQuestions = () => {
    connectToDatabase();

    //Initial Question about what to do
    return inquirer.prompt(
        {
            type: 'list',
            name: 'views',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'delete an employee', 'Print', 'exit']
        },
        //Picks out which choice was made and executes the display and follow up questions
    ).then(viewData => {
        // Show options based on what was selected
        if(viewData.views === 'view all roles'){
            //Calls in roles Function
            viewRoles()
            .then(viewQuestions);
        } else if (viewData.views === 'view all departments') {
            //Calls in Departments Function
            viewDepartments()
            .then(viewQuestions);
        } else if (viewData.views === 'view all employees') {
            //Calls in Employee View Function
            viewEmployees()
            .then(viewQuestions);
        } else if (viewData.views === 'add a department') {
            //Asks for the name of the dept
            inquirer.prompt(
                {  
                    type: 'input',
                    name: 'department_name',
                    message: 'What would you like to call this new Department?'
                }
            ).then(question_dept => {
                //Calls in Add Department
                addDept(question_dept.department_name)
                .then(viewQuestions);
            });
        } else if (viewData.views === 'add a role') {
            //Asks for the name of the role, salary, and department
            roleQuestions()
            .then(viewQuestions);
        } else if (viewData.views === 'add an employee') {
            //Asks for employee firstname, lastname, role & manager
            newEmployeeQuestions()
            .then(viewQuestions);

        } else if (viewData.views === 'update an employee role'){
            //Asks whiche employee you would like to update and their role
            updateEmployee()
            .then(viewQuestions);
        } else if (viewData.views === 'delete an employee'){
            //Ask which employee you would like to remove
            deleteEmployeeQuestions()
            .then(viewQuestions);
        } else if (viewData.views === 'Print'){
            //send all the data from employees into js/index.js for html parsing
            sendInformation()
            .then(data => {
                generateHtml(data);
            }).then(viewQuestions);
        } else {
            console.log('Goodbye!');
            process.exit();
        }
    });
};

// Seperate Function Calls for Questions

//Questions for adding a new role
async function roleQuestions () {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'role_name',
            message: 'What is the name of this role?'
        },
        {
            type: 'input',
            name: 'role_salary',
            message: 'What is the salary for this position?'
        },
        {
            type: 'list',
            choices: await departmentChoices(),
            name: 'department_selection',
            message: 'Please select a department for this role'
        }
    ]).then(async data => {
        //call a function that looks for the id of the selected dept
        addRole(data.role_name, data.role_salary, await unqiueDept(data))    
    });
};

//questions for employee firstname, lastname, role & manager
async function newEmployeeQuestions () {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employees first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employees last name?'
        },
        {
            type: 'list',
            choices: await roleChoices(),
            name: 'role',
            message: 'Please select a role for this employee'
        },
        {
            type: 'list',
            choices: await managerChoices(),
            name: 'manager',
            message: 'Who is this employees manager?' 
        }
    ]).then(async data => {
        //call a function that looks for the id of the selected role
        addEmployee(data.first_name, data.last_name, await uniqueManager(data), await uniqueRole(data));
    });
};

//Asks which employee you would like to update, and which role you would like to change
async function updateEmployee () {
    return inquirer.prompt([
        {
            type: 'list',
            choices: await employeeChoices(),
            name: 'employee',
            message: 'Which employee would you like to update?'
        },
        {
            type: 'list',
            choices: await roleUpdate(),
            name: 'role',
            message: 'What role would you like to give this person?'
        }
    ]).then(async data => {
        console.log(data);
        //Update the role on the selected employee
        finalUpdate(await uniqueEmployee(data), await uniqueRole(data))
    })
};

//Ask which employee you would like to delete
async function deleteEmployeeQuestions() {
    return inquirer.prompt([
        {
            type: 'list',
            choices: await employeeChoices(),
            name: 'employee',
            message: 'Which employee would you like to remove?'
        }
    ]).then(async data => {
        console.log(data);
        deleteEmployee(await uniqueEmployee(data));
    });
};

const generateHtml = (data)  => {
    return new Promise ((res, rej) => {
        if (rej) console.log(rej);
        //stores the individual employees with their corresponding values
    let htmlString = [];
    //might not need this
    if (!data.storage) {
        data.storage = [];
    };
    //console.log(data);
    for (let i = 0; i < data.length; i++) {

        //get role
        const employeeRole = data.map(data => data.title);
        const employeeRoleFinal = employeeRole[i];
        //get first name
        const employeeFirstName = data.map(data => data.first_name);
        const employeeFirstNameFinal = employeeFirstName[i];
        //get last name
        const employeeLastName = data.map(data => data.last_name);
        const employeeLastNameFinal = employeeLastName[i];
        //get manager
        const manager = data.map(data => data.manager);
        const managerFinal = manager[i];
        //get salary
        const salary = data.map(data => data.salary);
        const salaryFinal = salary[i];
        //get department
        const department = data.map(data => data.department);
        const departmentFinal = department[i];
        //create the html based on the created person above
        if(managerFinal !== null){
            htmlString[i] = `
            <div class="card text-dark employeeCardBackground m-3 text-capitalize" style="width: 18rem; height: 19rem;">
                <div class="card-header employeeCardHeader fs-3 fw-bold">${employeeFirstNameFinal} ${employeeLastNameFinal}</div>
                <div class="card-body">
                    <h5 class="card-title fs-4">${employeeRoleFinal}</h5>
                    <p class="card-text"><span class ="fw-bold">Reporting Manager:</span> ${managerFinal}</p>
                    <p class="card-text"><span class ="fw-bold">Salary:</span> $${salaryFinal}</p>
                    <p class="card-text"><span class ="fw-bold">Department:</span> ${departmentFinal}</p>
                </div>
            </div>`;
    } else {
        //removes the Reports to <p> Element if they do not have a manager
        htmlString[i] = `
            <div class="card text-dark employeeCardBackground m-3 text-capitalize" style="width: 18rem; height: 19rem;">
                <div class="card-header employeeCardHeader fs-3 fw-bold">${employeeFirstNameFinal} ${employeeLastNameFinal}</div>
                <div class="card-body">
                    <h5 class="card-title fs-4">${employeeRoleFinal}</h5>
                    <p class="card-text"><span class ="fw-bold">Salary:</span> $${salaryFinal}</p>
                    <p class="card-text"><span class ="fw-bold">Department:</span> ${departmentFinal}</p>
                </div>
            </div>`;
    };
};
    const string = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Employee Report Sheet</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
            <link href="./style.css" rel="stylesheet">
        </head>
        <body>
            <header class="indexHeader d-flex justify-content-center align-items-center flex-wrap">
                <h1 class="text-white fs-1">Employee Report Sheet</h1>
            </header>
            <section class="d-flex justify-content-center align-items-start flex-wrap">
                ${htmlString.join('')}
            </section>
            <script src="../assets/js/index.js"></script>
        </body>
    </html>`;
    res(string)
    }).then(write => {
        writeFile(write);
    });
}

module.exports = viewQuestions;
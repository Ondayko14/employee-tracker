const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const {viewDepartments, connectToDatabase, viewRoles, viewEmployees, addDept, departmentChoices, unqiueDept, addRole, roleChoices, managerChoices, uniqueManager, addEmployee, uniqueRole, employeeChoices, roleUpdate, uniqueEmployee} = require('./database');
//Ask Questions
const viewQuestions = () => {
    connectToDatabase();

    //Initial Question about what to do
    return inquirer.prompt(
        {
            type: 'list',
            name: 'views',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'exit']
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
        console.log(data);
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
        console.log(data);
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
            name: 'new_role',
            message: 'What role would you like to give this person?'
        }
    ]).then(async data => {
        console.log(data);
        //Update the role on the selected employee
        //finalUpdate(await uniqueEmployee(data), await uniqueRole(data))
        uniqueEmployee(data);
    })
};

module.exports = viewQuestions;
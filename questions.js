const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const {viewDepartments, connectToDatabase, viewRoles, viewEmployees} = require('./database');
//Ask Questions
const viewQuestions = function() {
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
            //Calls in Add Dept Function
            addDept()
            .then(viewQuestions);
            console.log('add a new department');
        } else if (viewData.views === 'add a role') {
            console.log('add a new role');
        } else if (viewData.views === 'add an employee') {
            console.log('add a new employee');
        } else if (viewData.views === 'update an employee'){
            console.log('update an employee');
        } else {
            console.log('Goodbye!');
            process.exit();
        }
    });
};

module.exports = viewQuestions;
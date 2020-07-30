
// Dependencies
// =============================================================
const mysql = require("mysql");
const inquirer = require('inquirer');
const cTable = require('console.table');
const dotenv = require('dotenv').config()


const connection = mysql.createConnection({
  host: process.env.DB_HOST,

  // Your port; if not 3306
  port: 3306,

  // Your usernamenode 
  user: process.env.DB_USER,

  // Your password
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  mainPrompt();
});


function mainPrompt() {
  inquirer
    .prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: ['Add', 'View', 'Update', 'Exit'],
          },
    ]).then(val => {
      if(val.choices === 'Add') addCommandPromt();
      if(val.choices === 'View') viewRoles();
      if(val.choices === 'Update') updateRoles();
      if(val.choices === 'Exit') return;
    })
}

function addCommandPromt() {
  inquirer
    .prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: ['Add department', 'Add Role', 'Add Employee', 'Exit'],
          },
    ]).then(val => {
      console.table(val);
    })

}

function viewRoles() {
  inquirer
    .prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: ['View Employees', 'View Departments', 'View Roles', 'Exit'],
          },
    ]).then(val => {
      if(val.choices === 'View Employees') {
        connection.query("SELECT employee.id, first_name, last_name, title, salary, name as Department FROM employee inner join role on employee.role_id = role.id inner join department on role.department_id = department.id", function(err, res) {
          if (err) throw err;
          console.table(res);
          connection.end();
        });
      };
      if(val.choices === 'View Departments') {
        connection.query("SELECT * FROM department", function(err, res) {
          if (err) throw err;
          console.table(res);
          connection.end();
        });
      };
      if(val.choices === 'View Roles') {
        connection.query("SELECT * FROM role", function(err, res) {
          if (err) throw err;
          console.table(res);
          connection.end();
        });
      };
      if(val.choices === 'Exit') return;
    })


  
  console.log('\n Test View Roles \n');
}
function updateRoles() {
  console.log('\n Test Update Roles \n');
}
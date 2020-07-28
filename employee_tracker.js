
// Dependencies
// =============================================================
const mysql = require("mysql");
const inquirer = require('inquirer');
const cTable = require('console.table');
const pw = require('./pw.js');

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your usernamenode 
  user: "root",

  // Your password
  password: pw,
  database: "employee_trackerdb"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  mainPrompt()
  connection.end();
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
      console.table(val);
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
  console.log('\n Test View Roles \n');
}
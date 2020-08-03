
// Dependencies
// =============================================================
const mysql = require("mysql");
const inquirer = require('inquirer');
const cTable = require('console.table');
const dotenv = require('dotenv').config();
const validateNumber = require('./validateNumber');
const validateInput = require('./validateInput');


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
      if(val.choices === 'Exit') connection.end();
    })
}

function addCommandPromt() {
  inquirer
    .prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: ['Add department', 'Add Role', 'Add Employee', 'Back'],
          },
    ]).then(val => {
      if (val.choices === 'Add department'){
        inquirer
          .prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Department Name:',
          },
    ]).then(val => {
      const department = val.department.trim();
      if (val.department !== ''){
      connection.query("INSERT INTO department (name) VALUES (?)",[department], function(err, res) {
        if (err) throw err;
        console.table(res);
        mainPrompt();
      });
     }
    })
      }
      if (val.choices === 'Add Role'){
        inquirer
          .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Title:',
            validate: validateInput,
          },
          {
            type: 'number',
            name: 'salary',
            message: 'Salary:',
            validate: validateNumber,
          },
          {
            type: 'number',
            name: 'department_id',
            message: 'Department id:',
            validate: validateNumber,
          },
    
          
    ]).then(val => {
      const { title } = val;
      const { salary } = val;
      const { department_id } = val;
      connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",[title, salary, department_id], function(err, res) {
        if (err) throw err;
        console.table(res);
        mainPrompt();
      });
     })

      }
      if (val.choices === 'Add Employee'){
        inquirer
          .prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Employee First Name:',
            validate: validateInput,
          },
          {
            type: 'input',
            name: 'last_name',
            message: 'Employee Last Name:',
            validate: validateInput,
          },
          {
            type: 'number',
            name: 'role_id',
            message: 'role id:',
            validate: validateNumber,
          },
          {
            type: 'number',
            name: 'manager_id',
            message: 'manager id:',
            validate: validateNumber,
          },          
    ]).then(val => {
      const { first_name, last_name, role_id, manager_id } = val;
      connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id ) VALUES (?, ?, ?, ?)",[first_name, last_name, role_id, manager_id ], function(err, res) {
        if (err) throw err;
        console.table(res);
        mainPrompt();
      });
     })

      }
      if (val.choices === 'Back') mainPrompt();
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
          mainPrompt();
        });
      };
      if(val.choices === 'View Departments') {
        connection.query("SELECT * FROM department", function(err, res) {
          if (err) throw err;
          console.table(res);
          mainPrompt();
        });
      };
      if(val.choices === 'View Roles') {
        connection.query("SELECT * FROM role", function(err, res) {
          if (err) throw err;
          console.table(res);
          mainPrompt();
        });
      };
      if(val.choices === 'Exit') mainPrompt();
    })
}
function updateRoles() {
  connection.query("SELECT employee.id, first_name, last_name, title, salary, name as Department FROM employee inner join role on employee.role_id = role.id inner join department on role.department_id = department.id", function(err, res) {
    if (err) throw err;
    const employeeArr = [];
    for (const employee of res) {
      const emp = {
        value: employee.id,
        name: employee.id + ' | ' + employee.first_name + ' ' + employee.last_name + ' | ' + employee.title + ' | ' + employee.salary + ' | ' + employee.Department,
      }
      employeeArr.push(emp); 
    }
    inquirer
          .prompt([
        {
            type: 'list',
            name: 'employee_list',
            message: 'Select employee:',
            choices: [...employeeArr],
          },
    ]).then(val =>{
      if (val.employee_list === "Cancel") mainPrompt();
      const selectEmp = res.filter(emp => emp.id === val.employee_list);
      console.log(selectEmp);
      inquirer
          .prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Employee First Name:',
            default: selectEmp[0].first_name,
          },
          {
            type: 'input',
            name: 'last_name',
            message: 'Employee Last Name:',
            default: selectEmp[0].last_name,
          },
          {
            type: 'number',
            name: 'role_id',
            message: 'role id:',
            validate: validateNumber,
          },
          {
            type: 'number',
            name: 'manager_id',
            message: 'manager id:',
            validate: validateNumber,
          },          
    ]).then(val => {
      console.log(val);
      connection.query("UPDATE employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE employee.id = ?", [val.first_name, val.last_name, val.role_id, val.manager_id, selectEmp[0].id], function(err, res) {
        if (err) throw err;
        console.table(res);
        mainPrompt();
      });
    })
      


    })
  });

}
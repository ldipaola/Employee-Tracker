
// Dependencies
// =============================================================
const mysql = require("mysql");
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your usernamenode 
  user: "root",

  // Your password
  password: "",
  database: "employee_trackerdb"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  connection.end();
});
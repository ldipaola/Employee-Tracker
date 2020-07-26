DROP DATABASE IF EXISTS employee_trackerdb;

CREATE DATABASE employee_trackerdb;

USE employee_trackerdb;

CREATE TABLE department (
id INT NOT NULL auto_increment,
name VARCHAR(30),
PRIMARY KEY (id)
);

CREATE TABLE role (
id INT NOT NULL auto_increment,
title VARCHAR(30) NULL,
salary DECIMAL,
department_id integer,
primary key (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id integer NULL,
  manager_id integer NULL,
  PRIMARY KEY (id)
);

DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;


CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30)NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    department_id INT NOT NULL,
    salary DECIMAL NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id)
    REFERENCES department(id)
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),
  FOREIGN KEY(role_id) REFERENCES roles(id),
FOREIGN KEY (manager_id) REFERENCES employee(id)

);
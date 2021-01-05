USE employee;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS managers;

CREATE TABLE employees (
    id int (20) AUTO_INCREMENT,
    PRIMARY KEY (id),
    first_name VARCHAR(30) NOT NULL,
    last_name  VARCHAR(20) NOT NULL,
    role_id INT,
    manager_id INT,
);

CREATE TABLE roles (
    title VARCHAR(30),
    salary decimal,
    department_id INT,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES employees(role_id)
);

CREATE TABLE departments (
    name VARCHAR(30),
);

CREATE TABLE managers (
    name VARCHAR(30),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(manager_id)
);
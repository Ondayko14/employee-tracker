DROP TABLE IF EXISTS employees;
USE employee.db;

CREATE TABLE employees (
    id INT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name  VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT
);
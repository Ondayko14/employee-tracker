USE employee;
DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
    id int (20) AUTO_INCREMENT,
    PRIMARY KEY (id),
    first_name VARCHAR(30) NOT NULL,
    last_name  VARCHAR(20) NOT NULL,
    role_id INT,
    manager_id INT
);
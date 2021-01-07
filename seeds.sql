INSERT INTO departments (name)
VALUES 
('Technology'),
('Customer Service'),
('Managment');

INSERT INTO roles (title, salary, department_id)
VALUES
('Engineer', 90000, 1),
('Manager', 80000, 3),
('Intern', 30000, 1),
('IT', 65000, 1),
('Help Desk', 55000, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Carry', 'Underwood', 1, null),
('Mariah', 'Carrie', 1, null),
('Larry', 'McFarry', 1, null),
('Burger', 'Mcdonalds', 1, 1),
('Jerry', 'McFlurry', 1, 1),
('Wendy', 'Testaburger', 2, 1),
('Philip', 'Fry', 3, 1),
('Terry', 'Cruzin', 4, 2),
('Gary', 'Bob', 1, 1),
('Terrance', 'TorrentPants', 1, 3);
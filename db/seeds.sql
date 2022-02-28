INSERT INTO department (name)
VALUES ("Merchandising"),
("Purchasing"),
("Receiving");

INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Merchandiser", 70000, 1),
("Merchandiser", 60000, 1),
("Lead Buyer", 80000, 2),
("Buyer", 75000, 2),
("Lead Receiver", 80000, 3),
("Receiver", 75000, 3);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Zach", "Rojas", 1, NULL),
("Chris", "Perez", 1, 1),
("Eric", "Santamaria", 2, NULL),
("Cale", "McKenna", 2, 2),
("Adam", "Amparan", 3, NULL),
("Mitchell", "Vega", 3, 3);
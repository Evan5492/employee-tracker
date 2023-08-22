INSERT INTO department (name)
VALUES 
("Sales"),
 ("Engineering"),
 ("Finance"),
 ("Legal");

 INSERT INTO roles (title, salary, department_id)
 VALUES
 ("Sales Lead",100000,1),
 ("Salesperson",80000,1),
 ("Lead Engineer",150000,2),
 ("Software Engineer",120000,2),
 ("Account Manager",160000,3),
 ("Accountant", 125000,3),
("Leagal Team Lead",250000,4),
("Lawyer",190000,4);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES 
("John","Doe",1,null),
("Ashley", "Rodriguez",2,null),
 ("Kunal","Singh", 3,null),
 ("Sarah", "Lourd",4,null);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES 
 ("Mike", "Chan",1,17),
("Kevin","Tupik", 2,18),
("Malia","Brown",3,19),
 ("Tom","Allen", 4,20);
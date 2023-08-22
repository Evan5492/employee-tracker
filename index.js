const inquirer = require('inquirer');
const db = require('./config/connection.js');

function promptUser () {
    inquirer.prompt({
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Exit"
        ]
    
})
.then(answer => {
    switch(answer.choice){
        case "View All Departments":
            viewDepartments();
            break;
        case "View All Roles":
            viewRoles();
            break;
        case "View All Employees":
            viewEmployees();
            break;
        case "Add Department":
            addDepartment();
            break;
        case "Add Role":
            addRole();
            break;
        case "Add Employee":
            addEmployee();
            break;
        case "Update Employee Role":
            updateEmployeeRole();
            break;
        case "Exit":
            db.end();
            break;
    }
});
}



async function viewDepartments() {
    try {
        const [rows] = await
        db.promise().query("SELECT * FROM department");
        console.table(rows);
    } catch(err) {
            console.error(err);
            promptUser();
        
    }
}

async function viewRoles () {
    try {
        const [rows] = await 
        db.promise().query("SELECT * FROM roles");
        console.table(rows);
    } catch(err) {
        console.error(err);
        promptUser();
    }
}

async function viewEmployees () {
    try {
        const [rows] = await 
        db.promise().query("SELECT * FROM employee");
        console.table(rows);
    } catch(err) {
        console.error(err);
        promptUser();
    }
}

async function addDepartment() {
    try {
        const { name } = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter department name:',
            },
        ]);
        
        const [result] = await
        db.promise().query("INSERT INTO department (name) VALUES (?)", [name]);
        console.log(`Added ${name} department!`);
        promptUser();
    } catch (err) {
        console.error(err);
        promptUser();
    }
}

async function addRole() {
    try {
        const departments = await
         db.promise().query("SELECT * FROM department");
        const departmentChoices = departments[0].map((department) => ({
            name: department.name,
            value: department.id,
        }));

        const { title, department_id, salary } = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter role:',
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Choose department:',
                choices: departmentChoices,
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter salary:',
            },
        ]);

        await db.promise().query("INSERT INTO roles (title, department_id, salary) VALUES (?, ?, ?)", [title, department_id, salary]);
        console.log(`${title} added.`);
        promptUser();
    } catch (err) {
        console.error(err);
        promptUser();
    }
}

async function addEmployee() {
    try {
        const roles = await 
        db.promise().query("SELECT * FROM roles");
        const roleChoices = roles[0].map((role) => ({
            name: role.title,
            value: role.id,
        }));

        const employees = await 
        db.promise().query("SELECT * FROM employee");
        const managerChoices = employees[0].map((employee) => ({
            name: employee.first_name + ' ' + employee.last_name,
            value: employee.id,
        }));
        managerChoices.push({name: "None", value: null});

        const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'First name:',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Last name:',
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Select role:',
                choices: roleChoices,
            },
            {
                type: 'list',
                name: 'manager_id',
                message: 'Select manager:',
                choices: managerChoices,
            },
        ]);

        await 
        db.promise().query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [first_name, last_name, role_id, manager_id]);
        console.log(`Added ${first_name} ${last_name} as an employee!`);
        promptUser();
    } catch (err) {
        console.error(err);
        promptUser();
    }
}

async function updateEmployeeRole() {
    try {
        const employees = await db.promise().query("SELECT * FROM employee");
        const employeeChoices = employees[0].map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
        }));

        const roles = await 
        db.promise().query("SELECT * FROM roles");
        const roleChoices = roles[0].map((role) => ({
            name: role.title,
            value: role.id,
        }));

        const { employee_id, role_id } = await inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: 'Choose employee to update:',
                choices: employeeChoices,
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Choose new role:',
                choices: roleChoices,
            },
        ]);

        await 
        db.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [role_id, employee_id]);
        console.log('Employee role updated successfully!');
        promptUser();
    } catch (err) {
        console.error(err);
        promptUser();
    }
}




promptUser();
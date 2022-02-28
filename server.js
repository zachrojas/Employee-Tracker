const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Skyw@lk3r",
    database: "workers_db",
  },
  console.log(`Connected to the workers_db database.`)
);

const questions = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "questions",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee's info",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.questions) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee's info":
          updateInfo();
          break;
        case "Exit":
          db.end();
          break;
        default:
          break;
      }
    });
};

const viewAllDepartments = () => {
  db.query(`SELECT * FROM departments;`, (err, res) => {
    if (err) throw err;
    console.table(res);
    questions();
  });
};

const viewAllRoles = () => {
  db.query(`SELECT * FROM roles;`, (err, res) => {
    if (err) throw err;
    console.table(res);
    questions();
  });
};

const viewAllEmployees = () => {
  db.query(`SELECT * FROM employees;`, (err, res) => {
    if (err) throw err;
    console.table(res);
    questions();
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Enter the name of the department you would like to add",
      },
    ])
    .then((answer) => {
      db.query(
        `INSERT INTO departments (name) VALUES ('${answer.departmentName}');`,
        (err, result) => {
          if (err) throw err;
          console.log("Success");
          questions();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the name of the role you would like to add",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary for this role",
      },
      {
        type: "input",
        name: "departments_id",
        message: "Enter the department",
      },
    ])
    .then((answer) => {
      db.query(
        `INSERT INTO roles (title, salary, department_id) VALUES ('${answer.title}', ${answer.salary}, ${answer.department_id});`,
        (err, res) => {
          if (err) throw err;
          console.log("Success");
          questions();
        }
      );
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter first name",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter last name",
      },
      {
        type: "input",
        name: "roles_id",
        message: "Enter role id",
      },
    ])
    .then((answer) => {
      db.query(
        `INSERT INTO employee (first_name, last_name, roles_id) VALUES (${answer.first_name}, ${answer.last_name}, ${answer.roles_id}):`,
        (err, res) => {
          if (err) throw err;
          console.log("Success");
          questions();
        }
      );
    });
};

db.connect((err) => {
  if (err) throw err;
  questions();
});

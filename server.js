const mysql = require('mysql2');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'busniess_db',
});

inquirer.prompt([
  {
    type: 'list',
    name: 'action',
    message: 'What do you want to do?',
    choices: [
      'View all employees',
      'Add employee',
      'View all roles',
      'Add role',
      'View all departments',
      'Add department',
    ],
  },
])
.then((answers) => {
  switch (answers.action) {
    case 'View all employees':
      connection.query('SELECT * FROM employee', (err, rows) => {
        if (err) throw err;
        console.log('All employees:', rows);
        console.table(rows);
        connection.end(); 
      });
      break;
      case 'Add employee':
        inquirer.prompt([
          {
            type: 'input',
            name: 'firstName',
            message: 'Enter employee first name:',
          },
          {
            type: 'input',
            name: 'lastName',
            message: 'Enter employee last name:',
          },
          {
            type: 'input',
            name: 'rolesId',
            message: 'Enter employee role ID:',
          },
          {
            type: 'input',
            name: 'managerId',
            message: 'Enter employee manager ID:',
          },
        ])
        .then((answers) => {
          const { firstName, lastName, rolesId, managerId } = answers;
          connection.query(
            'INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)',
            [firstName, lastName, rolesId, managerId],
            (err, result) => {
              if (err) {
                console.error('Error adding employee:', err);
                return;
              }
              console.log('Employee added successfully!');
              connection.end();
            }
          );
        })
        .catch((err) => {
          console.error('Error:', err);
        });
        break;
    case 'View all roles':
      connection.query('SELECT * FROM roles', (err, rows) => {
        if (err) throw err;
        console.log('All roles:', rows);
        console.table(rows);
        connection.end(); 
      });
      break;
      case 'Add role':
        inquirer.prompt([
          {
            type: 'input',
            name: 'title',
            message: 'Enter title of role:',
          },
          {
            type: 'input',
            name: 'departmentId',
            message: 'Enter department id:',
          },
          {
            type: 'input',
            name: 'salary',
            message: 'Enter salary:',
          },
        ])
        .then((answers) => {
          const { title, departmentId, salary } = answers;
          connection.query(
            'INSERT INTO roles (title, department_id, salary) VALUES (?, ?, ?)',
            [title, departmentId, salary],
            (err, result) => {
              if (err) {
                console.error('Error adding role:', err);
                return;
              }
              console.log('Role added successfully!');
              connection.end();
            }
          );
        })
        .catch((err) => {
          console.error('Error:', err);
        });
        break;
    case 'View all departments':
      connection.query('SELECT * FROM department', (err, rows) => {
        if (err) throw err;
        console.log('All departments:', rows);
        console.table(rows);
        connection.end();
      });
      break;
      case 'Add department':
        inquirer.prompt([
          {
            type: 'input',
            name: 'name',
            message: 'Enter department name',
          },
        ])
        .then((answers) => {
          const { name } = answers;
          connection.query(
            'INSERT INTO department (name) VALUES (?)',
            [name],
            (err, result) => {
              if (err) {
                console.error('Error adding department:', err);
                return;
              }
              console.log('department added successfully!');
              connection.end();
            }
          );
        })
        .catch((err) => {
          console.error('Error:', err);
        });
        break;
    default:
      console.log('Invalid action.');
      connection.end(); 
      break;
  }
})
.catch((err) => {
  console.error('Error:', err);
});

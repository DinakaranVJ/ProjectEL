const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'dina11', // Replace with your MySQL root password
  database: 'dish_management'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Database connected!');
});

module.exports = connection;

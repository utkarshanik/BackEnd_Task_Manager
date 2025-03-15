const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password:process.env.password,
  database: process.env.database
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Successfully connected to the database');
});

module.exports=connection;
// connection.end((err) => {
//   if (err) {
//     console.error('Error closing the connection:', err.stack);
//     return;
//   }
//   console.log('Connection closed');
// });
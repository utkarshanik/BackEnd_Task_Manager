const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});
//connecting string
// mysql://root:RCFQMmrkbBMtrxzyrHDpTuEKslFWSXXu@mysql.railway.internal:3306/railway
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Successfully connected to the database');
  setInterval(() => {
    connection.query("SELECT 1", (err) => {
      if (err) console.error("Keep-alive query failed:", err);
    });
  }, 300000); // 5 minutes
});

module.exports=connection;
// connection.end((err) => {
//   if (err) {
//     console.error('Error closing the connection:', err.stack);
//     return;
//   }
//   console.log('Connection closed');
// });
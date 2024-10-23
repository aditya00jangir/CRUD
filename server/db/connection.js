require("dotenv").config(); // Load environment variables

const mysql = require("mysql2");

const conn = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

conn.connect((err) => {
  if (err) throw err;
  console.log("db connected");
});

module.exports = conn;

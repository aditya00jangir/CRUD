const connection = require("../db/connection");
const createUsersTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS department_hd (
      id INT AUTO_INCREMENT PRIMARY KEY,
      department_name VARCHAR(255) NOT NULL
    )
  `;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error creating users table:", err);
    } else {
      console.log("Department table created successfully.");
    }
  });
};

module.exports = { createUsersTable };

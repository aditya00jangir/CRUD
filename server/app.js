const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
require("./db/connection");
const router = require("./roots/router");
const createDepartmentTable = require("./Models/department");

const port = 8001;

app.use(express.json());
app.use(cors());
app.use(router);
createDepartmentTable.createUsersTable();
app.listen(port, () => {
  console.log("server start as port" + port);
});

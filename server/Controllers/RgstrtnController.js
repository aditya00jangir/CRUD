const conn = require("../db/connection");

function CrtData(req, res) {
  {
    const { name, Email, MobNo, Address, Job } = req.body;
    if (!name || !Email || !MobNo) {
      return res.status(422).json("Please Enter the Required Data");
    }
    var currentdate = new Date();
    var datetime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    try {
      // Check for existing email
      conn.query(
        "SELECT * FROM user WHERE email = ? OR Mob_No = ?",
        [Email, MobNo],
        (err, result) => {
          if (err) {
            return res.status(500).json("Database error");
          }
          if (result.length) {
            return res.status(422).json("Duplicate Record");
          } else {
            // Save user data and image blob to the database
            const sql =
              "INSERT INTO user (name, email, Mob_No, Job, Emp_Img,Emp_Hbby,Emp_Gndr,Emp_Country,Emp_State,Emp_City,Created_At) VALUES (?, ?, ?, ?, ?,?,?,?,?,?,?)";
            const imageData = req.file ? req.file.buffer : null;
            const EmpHbby = req.body.hobby ? req.body.hobby : "";
            const EmpGndr = req.body.gender ? req.body.gender : "";
            const EmpCountry = req.body.country ? req.body.country : "";
            const EmpState = req.body.state ? req.body.state : "";
            const EmpCity = req.body.city ? req.body.city : "";
            // const EmpAddress = req.body.EmpAddress ? req.body.EmpAddress : "";

            conn.query(
              sql,
              [
                name,
                Email,
                MobNo,
                Job,
                imageData,
                EmpHbby,
                EmpGndr,
                EmpCountry,
                EmpState,
                EmpCity,
                datetime,
              ],
              (err) => {
                if (err) {
                  console.error("Error inserting data: ", err);
                  return res.status(500).json("Error inserting data");
                } else {
                  return res.status(201).json("Data Inserted Successfully");
                }
              }
            );
          }
        }
      );
    } catch (e) {
      console.error(e);
      return res.status(500).json("An unexpected error occurred");
    }
  }
}

function UpdtData(req, res) {
  const { Id, name, Email, MobNo, Address, Job } = req.body;
  console.log(Id, name, Email, MobNo, Address, Job);
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  if (!Id || !name || !Email || !MobNo) {
    return res.status(422).json("Please Enter the Required Data");
  }
  console.log(
    "SELECT * FROM user WHERE Id != ? AND (email = ? OR Mob_No = ?)",
    [Id, Email, MobNo]
  );
  try {
    // Check if the email already exists for a different user
    conn.query(
      "SELECT * FROM user WHERE Id != ? AND (email = ? OR Mob_No = ?)",
      [Id, Email, MobNo],
      (err, result) => {
        if (err) {
          return res.status(500).json("Database error");
        }
        if (result.length) {
          return res.status(422).json("Duplicate Record");
        } else {
          const imageData = req.file ? req.file.buffer : null; // Get image buffer
          const EmpHbby = req.body.hobby ? req.body.hobby : "";
          const EmpGndr = req.body.gender ? req.body.gender : "";
          const EmpCountry = req.body.country ? req.body.country : "";
          const EmpState = req.body.state ? req.body.state : "";
          const EmpCity = req.body.city ? req.body.city : "";
          // const EmpAddress = req.body.EmpAddress ? req.body.EmpAddress : ""; Emp_Address

          console.log("Image data:", imageData);

          const sql =
            "UPDATE user SET name = ?, email = ?, Mob_No = ?, Job = ?, Emp_Img = COALESCE(?, Emp_Img),Emp_Hbby = ?,Emp_Gndr = ? ,Emp_Country = ?,Emp_State = ?,Emp_City = ?,Updated_At = ? WHERE Id = ?";
          const params = [
            name,
            Email,
            MobNo,
            Job,
            imageData,
            EmpHbby,
            EmpGndr,
            EmpCountry,
            EmpState,
            EmpCity,
            datetime,
            Id,
          ];

          conn.query(sql, params, (error) => {
            if (error) {
              console.error("Error during update:", error);
              return res.status(500).json("Error updating user");
            } else {
              return res.status(200).json("User updated successfully");
            }
          });
        }
      }
    );
  } catch (e) {
    console.error(e);
    return res.status(500).json("An unexpected error occurred");
  }
}

function GetData(req, res) {
  const id = req.query.id;
  let query = "SELECT * FROM user";

  if (id) {
    query += " WHERE Id = ?";
  }
  conn.query(query, [id], (err, result) => {
    if (err) {
      return res.status(422).json("Data Not Available");
    }
    res.status(200).json(result); // Successful retrieval
  });
}
function DltRec(req, res) {
  const Id = req.body.id;

  conn.query("DELETE FROM user WHERE Id = ?", [Id], (err) => {
    if (err) {
      return res.status(422).json(err);
    }
    res.status(200).json("Data Deleted Successfully");
  });
}
module.exports = {
  CrtData,
  UpdtData,
  GetData,
  DltRec,
};

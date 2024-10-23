import React, { useEffect, useState } from "react";
import "../App.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

const Detail = ({ open, onClose, id }) => {
  const navigate = useNavigate();

  const [inpval, setInp] = useState({
    Id: "",
    name: "",
    Email: "",
    MobNo: "",
    Address: "",
    Job: "",
    Emp_Img: null,
  });

  const dltData = (id, name) => {
    const confirmDelete = window.confirm(`Do you want to delete ${name}?`);
    if (confirmDelete) {
      const deleteUser = async () => {
        try {
          const res = await fetch("/dltData", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          });
          const data = await res.json();
          if (res.status === 422 || !data) {
            alert(data);
          } else {
            alert(data);
            onClose(); // Close the modal after deletion
            window.location.reload();
          }
        } catch (error) {
          console.error("Error in deleting data:", error);
          alert("Error in deleting data");
        }
      };
      deleteUser();
    }
  };

  const getData = async (id) => {
    try {
      const res = await fetch(`/getusers?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        alert(data);
      } else {
        setInp({
          Id: data[0].Id,
          name: data[0].Name,
          Email: data[0].email,
          MobNo: data[0].Mob_No,
          Address: data[0].Address || "", // Ensure there's a default value
          Job: data[0].Job,
          Emp_Img: data[0].Emp_Img
            ? Buffer.from(data[0].Emp_Img).toString("base64") // Convert to Base64
            : null,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data");
    }
  };

  const updtData = (id) => {
    navigate(`/edit/${id}`);
  };

  useEffect(() => {
    if (id) {
      getData(id); // Fetch data when id changes
    }
  }, [id]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Detail Information</DialogTitle>
      <DialogContent style={{ width: "800px" }}>
        <Card sx={{ maxWidth: 800 }}>
          <CardContent>
            <div className="row">
              <div className="left_view col-md-6 col-lg-6 col-12">
                <img
                  src={`data:image/jpeg;base64,${inpval.Emp_Img}`}
                  style={{ width: 100, borderRadius: "30px" }}
                  alt="profile"
                />
                <h3 className="mt-3">
                  Name: <span style={{ fontWeight: 100 }}>{inpval.name}</span>
                </h3>
                <h3 className="mt-3">
                  Email: <span style={{ fontWeight: 100 }}>{inpval.Email}</span>
                </h3>
              </div>
              <div className="Right_view col-md-6 col-lg-6 col-12">
                <button
                  className="btn btn-primary"
                  onClick={() => updtData(inpval.Id)}
                >
                  <i className="fa-solid fa-pen"></i>
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => dltData(inpval.Id, inpval.name)}
                >
                  <i className="fa-sharp-duotone fa-solid fa-trash"></i>
                </button>
                <h3 className="mt-4">
                  Mobile No:{" "}
                  <span style={{ fontWeight: 100 }}>{inpval.MobNo}</span>
                </h3>
                <h3 className="mt-4">
                  Address:{" "}
                  <span style={{ fontWeight: 100 }}>{inpval.Address}</span>
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Detail;

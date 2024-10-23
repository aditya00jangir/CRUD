import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DetailPopup from "../Component/details"; // Ensure this is the correct path

const Home = () => {
  const [users, setUsers] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const getData = async () => {
    try {
      const res = await fetch("/getusers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        alert(data);
      } else {
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data");
    }
  };

  const openDetailPopup = (id) => {
    setSelectedId(id);
    setPopupOpen(true);
  };

  const closeDetailPopup = () => {
    setPopupOpen(false);
    setSelectedId(null);
  };

  const dltRow = (id, name) => {
    const confirmDelete = window.confirm(`Do you want to delete ${name}?`);
    if (confirmDelete) {
      const dltData = async () => {
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
            setUsers((prevUsers) => prevUsers.filter((user) => user.Id !== id));
            alert(data);
          }
        } catch (error) {
          console.error("Error in deleting data:", error);
          alert("Error in deleting data");
        }
      };
      dltData();
    }
  };

  const navigate = useNavigate();

  const handleAddData = () => {
    navigate("/ragister");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mt-5">
      <style>
        {`
    table {
      width: 100%;
      border-collapse: collapse;
    }

    thead {
      background: #f1f1f1;
    }

    tbody {
      display: block; /* Allows the tbody to be scrollable */
      max-height: 200px; /* Set a fixed height */
      overflow-y: auto; /* Enables vertical scrolling */
      overflow-x: auto; /* Enables horizontal scrolling */
    }

    tr {
      display: table; /* Ensures each row behaves like a table row */
      table-layout: fixed; /* Ensures proper column width */
      width: 100%; /* Ensure rows take the full width of the table */
    }

    td, th {
      border: 1px solid #ddd; /* Add borders to table cells */
      padding: 8px; /* Add padding to cells */
      text-align: left; /* Align text to the left */
      overflow: hidden; /* Prevents overflow */
      white-space: nowrap; /* Prevents text wrapping */
      text-overflow: ellipsis; /* Adds ellipsis (...) for overflowing text */
    }

    /* Optional: Add specific width for columns */
    th:nth-child(2),
    td:nth-child(2) {
      width: 150px; /* Adjust as necessary */
    }

    th:nth-child(3),
    td:nth-child(3) {
      width: 200px; /* Adjust as necessary */
    }
  `}
      </style>
      <div className="container">
        <div className="add_btn mt-2">
          <button className="btn btn-primary" onClick={handleAddData}>
            Add Employee
          </button>
        </div>
        <table className="table">
          <thead>
            <tr className="table-dark">
              <th scope="col">Id</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Designation</th>
              <th scope="col">Mobile Number</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.Id}>
                  <th scope="row">{user.Id}</th>
                  <td>{user.Name}</td>
                  <td>{user.email}</td>
                  <td>{user.Job}</td>
                  <td>{user.Mob_No}</td>
                  <td className="d-flex justify-content-between">
                    <button
                      onClick={() => openDetailPopup(user.Id)}
                      className="btn btn-success"
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                    <button
                      onClick={() => navigate(`/edit/${user.Id}`)}
                      className="btn btn-primary"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button
                      onClick={() => dltRow(user.Id, user.Name)}
                      className="btn btn-danger"
                    >
                      <i className="fa-sharp-duotone fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <DetailPopup
          open={popupOpen}
          onClose={closeDetailPopup}
          id={selectedId}
        />
      </div>
    </div>
  );
};

export default Home;

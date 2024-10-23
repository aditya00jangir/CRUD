import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { Buffer } from "buffer";
import {
  CountryDropdown,
  StateDropdown,
  CityDropdown,
} from "react-country-state-dropdown";

const Edit = () => {
  const { id } = useParams(); // Get the id from the URL
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const navigate = useNavigate(); // Hook for navigation
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);

  const handleSetCountry = (e, value) => {
    setState();
    setCountry(value);
  };
  const handleSetState = (e, value) => {
    setState(value);
  };
  const handleSetCity = (e, value) => {
    setCity(value);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedHobbies([...selectedHobbies, value]);
    } else {
      setSelectedHobbies(selectedHobbies.filter((hobby) => hobby !== value));
    }
  };
  const [inpval, setInp] = useState({
    Id: "",
    name: "",
    Email: "",
    MobNo: "",
    Address: "",
    Job: "",
    Emp_Img: null,
    hobby: [],
    gender: "",
    country: "",
    state: "",
    city: "",
  });

  const getData = async (id) => {
    const confirmDelete = window.confirm(`Do you want to update data`);
    if (confirmDelete) {
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
            Address: "",
            Job: data[0].Job,
            Emp_Img: data[0].Emp_Img
              ? Buffer.from(data[0].Emp_Img).toString("base64")
              : null,
            hobby: data[0].Emp_Hbby,
            gender: data[0].Emp_Gndr,
          });
          console.log(data[0].Emp_City);
          setCountry(data[0].Emp_Country);
          setState(data[0].Emp_State);
          setCity(data[0].Emp_City);
          setSelectedHobbies(
            data[0].Emp_Hbby ? data[0].Emp_Hbby.split(",") : []
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching data");
      }
    }
  };
  const updateInputData = async (e) => {
    e.preventDefault();
    var setCountryName = country;
    var setCityName = city;
    var setStateName = state;

    if (country?.name) {
      setCountryName = country.name;
    }
    if (state?.name) {
      setStateName = state.name;
    }
    if (city?.value) {
      setCityName = city.value;
    }
    const { name, Email, MobNo, Job } = inpval;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!name) {
      alert("Employee Name is required.");
      return;
    }
    if (!Email) {
      alert("Email is required.");
      return;
    }
    if (!emailRegex.test(Email)) {
      alert("Invalid email format.");
      return false;
    }
    if (!MobNo) {
      alert("Mobile Number is required.");
      return;
    }
    if (MobNo !== "") {
      if (MobNo.length > 12 || MobNo.length < 10) {
        alert("Mobile No lenght should be  less then 12");
        return false;
      }
    }
    const formData = new FormData();
    formData.append("Id", id);
    formData.append("name", name);
    formData.append("Email", Email);
    formData.append("MobNo", MobNo);
    formData.append("Address", inpval.Address);
    formData.append("Job", Job);
    formData.append("file", inpval.file);
    formData.append("hobby", selectedHobbies);
    formData.append("gender", inpval.gender);
    formData.append("country", setCountryName);
    formData.append("state", setStateName);
    formData.append("city", setCityName);

    const res = await fetch("/update", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      console.error("Error:", data);
      alert(data);
    } else {
      alert("Data updated successfully");
      navigate("/");
    }
  };
  const setData = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setInp((prevVal) => ({
        ...prevVal,
        [name]: files[0],
      }));
    } else {
      setInp((preval) => {
        return {
          ...preval,
          [name]: value,
        };
      });
    }
  };
  useEffect(() => {
    getData(id);
  }, [id]);

  return (
    <div className="container">
      <NavLink to="/">Back</NavLink>
      <form className="mt-4">
        <div className="row">
          {inpval.Emp_Img && (
            <div className="mb-6 col-lg-12 col-md-12 col-12 mb-3">
              {inpval.Emp_Img && (
                <img
                  src={`data:image/jpeg;base64,${inpval.Emp_Img}`}
                  alt="Profile"
                  style={{
                    width: "150px",
                    height: "60px",
                    marginTop: "10px",
                    marginLeft: "5px",
                    borderRadius: "5px",
                    borderColor: "black",
                  }}
                />
              )}
            </div>
          )}
          <div className="mb-1 col-lg-2 col-md-2 col-4">
            <input
              type="text"
              name="Id"
              hidden
              className="form-control"
              value={inpval.Id}
            />
            <label>
              Employee Name<span className="red-star">*</span>
            </label>
          </div>
          <div className="mb-2 col-lg-4 col-md-4 col-8">
            <input
              type="text"
              name="name"
              maxLength={45}
              className="form-control"
              onChange={setData}
              value={inpval.name}
              placeholder="Enter Employee Name"
            />
          </div>
          <div className="mb-1 col-lg-2 col-md-2 col-4">
            <label>
              E-mail<span className="red-star">*</span>
            </label>
          </div>
          <div className="mb-2 col-lg-4 col-md-4 col-8">
            <input
              type="email"
              name="Email"
              maxLength={45}
              className="form-control"
              onChange={setData}
              value={inpval.Email}
              placeholder="Enter email"
            />
          </div>
          <div className="mb-1 col-lg-2 col-md-2 col-4">
            <label>Job</label>
          </div>
          <div className="mb-2 col-lg-4 col-md-4 col-8">
            <input
              type="text"
              name="Job"
              maxLength={45}
              className="form-control"
              onChange={setData}
              value={inpval.Job}
              placeholder="Enter Job Name"
            />
          </div>
          <div className="mb-1 col-lg-2 col-md-2 col-4">
            <label>
              Mobile No.<span className="red-star">*</span>
            </label>
          </div>
          <div className="mb-2 col-lg-4 col-md-4 col-8">
            <input
              type="number"
              name="MobNo"
              onChange={setData}
              maxLength={12}
              minLength={8}
              value={inpval.MobNo}
              className="form-control"
              placeholder="Enter Mobile Number"
            />
          </div>
          <div className="mb-1 col-lg-2 col-md-2 col-4">
            <label>Address</label>
          </div>
          <div className="mb-2 col-lg-4 col-md-4 col-8">
            <input
              type="text"
              name="Address"
              onChange={setData}
              value={inpval.Address}
              className="form-control"
              placeholder="Enter Address"
            />
          </div>
          <div className="mb-1 col-lg-2 col-md-2 col-4">
            <label for="exampleInputEmail1">Country</label>
          </div>
          <div className="mb-2 col-lg-4 col-md-4 col-8">
            <CountryDropdown
              clearable
              value={country}
              style={{ width: "355px" }}
              onChange={handleSetCountry}
            />
          </div>
          <div className="mb-1 col-lg-2 col-md-2 col-4">
            <label for="exampleInputEmail1">State</label>
          </div>
          <div className="mb-2 col-lg-4 col-md-4 col-8">
            <StateDropdown
              clearable
              allowFreeFormText
              country={country}
              style={{ width: "355px" }}
              value={state}
              onChange={handleSetState}
            />
          </div>
          <div className="mb-1 col-lg-2 col-md-2 col-4">
            <label for="exampleInputEmail1">City</label>
          </div>
          <div className="mb-2 col-lg-4 col-md-4 col-8 ">
            {" "}
            <CityDropdown
              clearable
              allowFreeFormText
              style={{ width: "355px" }}
              country={country}
              state={state}
              value={city}
              onChange={handleSetCity}
            />
          </div>
          <div className="mb-1 col-lg-2 col-md-2 col-4">
            <label for="exampleInputEmail1">File</label>
          </div>
          <div className="mb-2 col-lg-4 col-md-4 col-8">
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={setData}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Address"
            />
          </div>
          <div className="mb-1 col-lg-2 col-md-2 col-4">
            <label for="gender">Gender</label>
          </div>
          <div className="mb-2 col-lg-4 col-md-4 col-8">
            <input
              type="radio"
              id="male"
              onChange={setData}
              className="ml-3"
              checked={inpval.gender === "Male"}
              value="Male"
              name="gender"
            />
            <label style={{ padding: "5px" }} htmlFor="male">
              Male
            </label>
            <input
              type="radio"
              checked={inpval.gender === "Female" ? true : false}
              id="female"
              onChange={setData}
              value="Female"
              name="gender"
            />
            <label style={{ padding: "5px" }} htmlFor="female">
              Female
            </label>
            <input
              type="radio"
              checked={inpval.gender === "Other" ? true : false}
              id="other"
              onChange={setData}
              value="Other"
              name="gender"
            />
            <label style={{ padding: "5px" }} htmlFor="other">
              Other
            </label>
          </div>
          <div className="col-mb-1 col-lg-2 col-md-2 col-4">
            <label for="hobies" style={{ paddingRight: "10px" }}>
              Hobbies
            </label>
          </div>
          <div className="mb-2 col-lg-4 col-md-4 col-8">
            <label style={{ paddingRight: "5px" }}>
              <input
                type="checkbox"
                value="Reading"
                checked={selectedHobbies.includes("Reading")}
                onChange={handleCheckboxChange}
              />
              Reading
            </label>
            <label style={{ paddingRight: "5px" }}>
              <input
                type="checkbox"
                value="Traveling"
                checked={selectedHobbies.includes("Traveling")}
                onChange={handleCheckboxChange}
              />
              Traveling
            </label>
            <label style={{ paddingRight: "5px" }}>
              <input
                type="checkbox"
                value="Cooking"
                checked={selectedHobbies.includes("Cooking")}
                onChange={handleCheckboxChange}
              />
              Cooking
            </label>
            <label style={{ paddingRight: "5px" }}>
              <input
                type="checkbox"
                value="Sports"
                checked={selectedHobbies.includes("Sports")}
                onChange={handleCheckboxChange}
              />
              Sports
            </label>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              onClick={updateInputData}
              className="btn btn-primary"
              style={{
                width: "100px",
                marginTop: "30px",
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Edit;

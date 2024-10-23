import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  CountryDropdown,
  StateDropdown,
  CityDropdown,
} from "react-country-state-dropdown";

const Register = () => {
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);

  const handleSetCountry = (e, value) => setCountry(value);
  const handleSetState = (e, value) => setState(value);
  const handleSetCity = (e, value) => setCity(value);

  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [inpval, setInp] = useState({
    name: "",
    Emai: "",
    MobNo: "",
    Address: "",
    Job: "",
    file: null,
    hobby: [],
    gender: "",
    state: "",
    country: "",
    city: "",
  });

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedHobbies([...selectedHobbies, value]);
    } else {
      setSelectedHobbies(selectedHobbies.filter((hobby) => hobby !== value));
    }
  };
  const setData = (e) => {
    const { name, value, type, files } = e.target;
    console.log(e.target.value);

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
  const addInputData = async (e) => {
    e.preventDefault();
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
      return;
    }
    if (!MobNo) {
      alert("Mobile Number is required.");
      return;
    }
    if (MobNo !== "") {
      if (MobNo.length > 12) {
        alert("Mobile No lenght should be greater 7 and less then 13");
        return;
      }
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("Email", Email);
    formData.append("MobNo", MobNo);
    formData.append("Address", inpval.Address);
    formData.append("Job", Job);
    formData.append("file", inpval.file);
    formData.append("hobby", selectedHobbies);
    formData.append("gender", inpval.gender);
    formData.append("country", country?.name ? country.name : "");
    formData.append("state", state?.name ? state.name : "");
    formData.append("city", city?.name ? city.name : "");
    console.log(formData);
    const confirmDelete = window.confirm(`Do you want to Save data`);
    if (confirmDelete) {
      try {
        const res = await fetch("/create", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
          console.error("Error:", data);
          alert(data);
        } else {
          alert("Data inserted successfully");
          setInp({
            name: "",
            Email: "",
            MobNo: "",
            Address: "",
            Job: "",
            file: null,
            hobby: [],
            gender: "",
            state: "",
            country: "",
            city: "",
          });
          setCountry(null);
          setState(null);
          setCity(null);
          setSelectedHobbies([]);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while submitting the form.");
      }
    }
  };
  return (
    <div className="container">
      <NavLink to="/">Back</NavLink>
      <form className="mt-4">
        <div className="row">
          <div className="mb-1 col-lg-2 col-md-2 col-4">
            <label for="exampleInputEmail1">
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
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Employee Name"
            />
          </div>
          <div className="mb-1 col-lg-2 col-md-2 col-4">
            <label for="exampleInputEmail1">
              E-mail<span className="red-star">*</span>
            </label>
          </div>
          <div className="mb-2 col-lg-4 col-md-4 col-8">
            <input
              type="email"
              name="Email"
              className="form-control"
              maxLength={45}
              onChange={setData}
              value={inpval.Email}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-1 col-lg-2 col-md-2 col-4">
            <label for="exampleInputEmail1">Job</label>
          </div>
          <div className="mb-2 col-lg-4 col-md-4 col-8">
            <input
              type="text"
              name="Job"
              maxLength={45}
              className="form-control"
              onChange={setData}
              value={inpval.Job}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Job Name"
            />
          </div>
          <div className="mb-1 col-lg-2 col-md-2 col-4">
            <label for="exampleInputEmail1">
              Mobile No.<span className="red-star">*</span>
            </label>
          </div>
          <div className="mb-2 col-lg-4 col-md-4 col-8">
            <input
              type="number"
              name="MobNo"
              maxLength={12}
              minLength={8}
              onChange={setData}
              value={inpval.MobNo}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Mobile Number"
            />
          </div>
          <div className="mb-1 col-lg-2 col-md-2 col-4">
            <label for="exampleInputEmail1">Address</label>
          </div>
          <div className="mb-2 col-lg-4 col-md-4 col-8">
            <input
              type="Text"
              name="Address"
              onChange={setData}
              value={inpval.Address}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Address"
            />
          </div>
          <div className="mb-1 col-lg-2 col-md-2 col-4">
            <label for="exampleInputEmail1">Country</label>
          </div>
          <div className="mb-2 col-lg-4 col-md-4 col-8">
            <CountryDropdown
              style={{ width: "355px" }}
              clearable
              value={country}
              onChange={handleSetCountry}
            />
          </div>

          <div className="mb-1 col-lg-2 col-md-2 col-4">
            <label for="exampleInputEmail1">State</label>
          </div>
          <div className="mb-2 col-lg-4 col-md-4 col-8">
            <StateDropdown
              clearable
              style={{ width: "355px" }}
              country={country}
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
              style={{ width: "355px" }}
              allowFreeFormText
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
              name="gender"
              onChange={setData}
              className="ml-3"
              value="Male"
            />
            <label style={{ padding: "5px" }} htmlFor="male">
              Male
            </label>
            <input
              type="radio"
              id="female"
              name="gender"
              onChange={setData}
              value="Female"
            />
            <label style={{ padding: "5px" }} htmlFor="female">
              Female
            </label>
            <input
              type="radio"
              id="other"
              name="gender"
              onChange={setData}
              value="Other"
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
              onClick={addInputData}
              className="btn btn-success"
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
export default Register;

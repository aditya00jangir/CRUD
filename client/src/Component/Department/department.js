import React from "react";
const Department = () => {
  return (
    <div className="container">
      <form className="mt-4">
        <div className="row">
          <div className="mb-1 col-lg-2 col-md-2 col-4">
            <label>Department Name</label>
          </div>
          <div className="mb-1 col-lg-2 col-md-2 col-8">
            <input
              type="text"
              className="form-control"
              id="dept-name"
              name="department"
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Department;

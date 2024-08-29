import React, { useState } from "react";
import Select from "react-select";
import { users, countries, departments, statuses } from "../../data.js";
import "./style.scss";

function AddUserModal({ onClose, onAdd }) {
  const [fullName, setFullName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!selectedCountry) newErrors.selectedCountry = "Country is required";
    if (!selectedDepartment)
      newErrors.selectedDepartment = "Department is required";
    if (!selectedStatus) newErrors.selectedStatus = "Status is required";
    return newErrors;
  };

  const handleAddUser = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newUser = {
      name: fullName,
      country: selectedCountry,
      department: selectedDepartment,
      status: selectedStatus,
    };
    users.push(newUser);
    onAdd(newUser);
    onClose();
  };

  return (
    <div className="wrapper">
      <div className="modal">
        <h1>ADD USER</h1>

        <div className="nameAndDepartment">
          <div className="nameBlock">
            <h4>Full Name</h4>
            <input
              className={`userName_input ${errors.fullName ? "error" : ""}`}
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter full name"
            />
            {errors.fullName && (
              <p className="error-message">{errors.fullName}</p>
            )}
          </div>
          <div className="departmentBlock">
            <h4>Department</h4>
            <Select
              className={`selectDefaultStyle ${
                errors.selectedDepartment ? "error" : ""
              }`}
              options={departments}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.value}
              value={selectedDepartment}
              onChange={(option) => setSelectedDepartment(option)}
              placeholder="Select department"
            />
            {errors.selectedDepartment && (
              <p className="error-message">{errors.selectedDepartment}</p>
            )}
          </div>
        </div>

        <div className="countryAndStatus">
          <div className="countryBlock">
            <h4>Country</h4>
            <Select
              className={`selectDefaultStyle ${
                errors.selectedCountry ? "error" : ""
              }`}
              options={countries}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.value}
              value={selectedCountry}
              onChange={(option) => setSelectedCountry(option)}
              placeholder="Select country"
            />
            {errors.selectedCountry && (
              <p className="error-message">{errors.selectedCountry}</p>
            )}
          </div>
          <div className="statusBlock">
            <h4>Status</h4>
            <Select
              className={`selectDefaultStyle ${
                errors.selectedStatus ? "error" : ""
              }`}
              options={statuses}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.value}
              value={selectedStatus}
              onChange={(option) => setSelectedStatus(option)}
              placeholder="Select status"
            />
            {errors.selectedStatus && (
              <p className="error-message">{errors.selectedStatus}</p>
            )}
          </div>
        </div>

        <div className="modal-buttons">
          <button onClick={onClose} className="cancelBtn">
            Cancel
          </button>
          <button onClick={handleAddUser} className="addBtn">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUserModal;

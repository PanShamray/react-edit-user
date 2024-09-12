import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  users as initialUsers,
  departments,
  countries,
  statuses,
} from "../../data.js";
import "./style.scss";

function EditUser() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [isEdited, setIsEdited] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || initialUsers;
    setUsers(storedUsers);
  }, []);

  const handleUserSelect = (selectedOption) => {
    setSelectedUser(selectedOption);
    const user = users.find(user => user.name === selectedOption.label);
    setUserData(user);
    setOriginalData(user);
    setIsEdited(false);
  };

  const handleUserNameChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setIsEdited(true);
  }

  const handleSelectChange = (option, section) => {
    setUserData({
      ...userData,
        [section]: {
        name: option.label,
        value: option.value,
      },
    });
    setIsEdited(true);
  }

  const handleUndo = () => {
    setUserData(originalData);
    setIsEdited(false);
  }

  const handleSave = () => {
    const updatedUsers = users.map((user) =>
      user.name === originalData.name ? userData : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setIsEdited(false);
    setOriginalData(userData);
  };

  return (
    <main>
      <h1>EDIT USER</h1>
      <section>
        <h4>User</h4>
        <Select
          className="selectDefaultStyle"
          options={users.map((user) => ({
            label: user.name,
            value: user.name,
          }))}
          onChange={handleUserSelect}
        />
        {selectedUser && (
          <>
            <div className="userInfo">
              <h3>User Information</h3>
              <div className="nameAndDepartment">
                <div className="nameBlock">
                  <h4>Full Name</h4>
                  <input
                    className="userName_input"
                    type="text"
                    name="name"
                    value={userData.name || ""}
                    onChange={handleUserNameChange}
                  />
                </div>
                <div className="departmentBlock">
                  <h4>Department</h4>
                  <Select
                    className="selectDefaultStyle"
                    options={departments.map((department) => ({
                      label: department.name,
                      value: department.value,
                    }))}
                    value={{
                      label: userData.department.name,
                      value: userData.department.value,
                    }}
                    onChange={(option) =>
                      handleSelectChange(option, "department")
                    }
                  />
                </div>
              </div>

              <div className="countryAndStatus">
                <div className="countryBlock">
                  <h4>Country</h4>
                  <Select
                    className="selectDefaultStyle"
                    options={countries.map((country) => ({
                      label: country.name,
                      value: country.value,
                    }))}
                    value={{
                      label: userData.country.name,
                      value: userData.country.value,
                    }}
                    onChange={(option) => handleSelectChange(option, "country")}
                  />
                </div>
                <div className="statusBlock">
                  <h4>Status</h4>
                  <Select
                    className="selectDefaultStyle"
                    options={statuses.map((status) => ({
                      label: status.name,
                      value: status.value,
                    }))}
                    value={{
                      label: userData.status.name,
                      value: userData.status.value,
                    }}
                    onChange={(option) => handleSelectChange(option, "status")}
                  />
                </div>
              </div>
            </div>

            <div className="undoAndSave">
              {isEdited && (
                <button onClick={handleUndo} className="undoButton">
                  Undo
                </button>
              )}
              <button
                disabled={!isEdited}
                onClick={handleSave}
                className="saveButton"
              >
                Save
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default EditUser;
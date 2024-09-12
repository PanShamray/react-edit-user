import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import { users, departments, statuses, countries } from "../../data.js";
import "./style.scss";
import TrashButton from "../../components/TrashButton.jsx";
import AddUserModal from "../../components/AddUserModal/AddUserModal.jsx";

function Users() {
  const [usersList, setUsersList] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : users;
  });
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(usersList);
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);

  const isFiltersActive = selectedDepartments.length >= 3;

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(usersList));
    setFilteredUsers(usersList);
  }, [usersList]);

  const CheckboxOption = ({ children, ...props }) => {
    return (
      <components.Option {...props}>
        <input
          className="checkbox"
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
          style={{
            width: 24,
            height: 24,
            border: "none",
            borderColor: "black",
            borderRadius: 0,
            verticalAlign: "middle",
            marginRight: 12,
            marginTop: 1,
            marginBottom: 1,
            marginLeft:0
          }}
        />
        <span className="custom-checkbox"></span>
        {children}
      </components.Option>
    );
  };

  const ValueContainer = ({ children, getValue, ...props }) => {
    const selectedOptions = getValue();
    const hasValue = selectedOptions.length > 0;

    return (
      <components.ValueContainer {...props}>
        {hasValue ? (
          <div>{`Selected (${selectedOptions.length})`}</div>
        ) : (
          children
        )}
      </components.ValueContainer>
    );
  };
  
  const handleDepartmentChange = (selectedOptions) => {
    setSelectedDepartments(selectedOptions);

    if (selectedOptions.length < 3) {
      setSelectedStatus(null);
      setSelectedCountry(null);
    }
  };

  const handleStatusChange = (selectedOption) => {
    if (isFiltersActive) {
      setSelectedStatus(selectedOption);
    }
  };

  const handleCountryChange = (selectedOption) => {
    if (isFiltersActive) {
      setSelectedCountry(selectedOption);
    }
  };

  const resetFilters = () => {
    setSelectedDepartments([]);
    setSelectedStatus(null);
    setSelectedCountry(null);
    setFilteredUsers(usersList);
  };

  const handleUserDelete = (userName) => {
    const updatedUsers = usersList.filter(user => user.name !== userName);
    setUsersList(updatedUsers);
  };

  const openAddUserModal = () => {
    setAddUserModalOpen(true);
  };

  const closeAddUserModal = () => {
    setAddUserModalOpen(false);
  }
  const handleAddUser = (newUser) => {
    setUsersList([...usersList, newUser]);
  } 

  return (
    <>
      {isAddUserModalOpen && (
        <AddUserModal onClose={closeAddUserModal} onAdd={handleAddUser} />
      )}
      <main>
        <h1>USERS</h1>
        <p className="filter_title">
          Please add at least 3 departmetns to be able to proceed next steps.
        </p>
        <section>
          <div className="filter_menu">
            <div className="filter_items">
              <Select
                isMulti
                options={departments.map((department) => ({
                  label: department.name,
                  value: department.value,
                }))}
                value={selectedDepartments}
                onChange={handleDepartmentChange}
                placeholder="Select departments"
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  Option: CheckboxOption,
                  ValueContainer: (props) => <ValueContainer {...props} />
                }}
              />
              <Select
                options={countries.map((country) => ({
                  label: country.name,
                  value: country.value,
                }))}
                value={selectedCountry}
                onChange={handleCountryChange}
                isDisabled={!isFiltersActive}
                placeholder="Select country"
              />
              <Select
                options={statuses.map((status) => ({
                  label: status.name,
                  value: status.value,
                }))}
                value={selectedStatus}
                onChange={handleStatusChange}
                isDisabled={!isFiltersActive}
                placeholder="Select status"
              />
            </div>

            <div className="filter_buttons">
              <button onClick={resetFilters} className="trashButton">
                <TrashButton />
              </button>
              <button className="popupButton" onClick={openAddUserModal}>
                Add User
              </button>
            </div>
          </div>
          <div className="users-list">
            <div className="list-titles">
              <div className="titles">
                <p>Full Name</p>
                <p>Department</p>
                <p>Country</p>
                <p>Status</p>
              </div>
            </div>
            <div className="users-block">
              <table>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.name}>
                      <td className="tdName">{user.name}</td>
                      <td className="tdDepartment">{user.department.name}</td>
                      <td className="tdCountry">{user.country.name}</td>
                      <td className="tdStatus">{user.status.name}</td>
                      <td>
                        <button
                          onClick={() => handleUserDelete(user.name)}
                          className="trashButton"
                        >
                          <TrashButton />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Users;

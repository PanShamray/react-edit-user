import React, {useState} from 'react';
import Select from "react-select";
import { users, departments, statuses, countries } from "../../data.js";
import "./style.scss";
import TrashButton from "../../components/TrashButton.jsx"
import AddUserModal from '../../components/AddUserModal/AddUserModal.jsx';

function Users() {
  const [usersList, setUsersList] = useState(users);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);

  const isFiltersActive = selectedDepartments.length >= 3;

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
    setFilteredUsers(users);
  };

  const handleUserDelete = (userName) => {
    const updatedUsers = filteredUsers.filter(user => user.name !== userName);
    setFilteredUsers(updatedUsers);
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
    <main>
      {isAddUserModalOpen && (
        <AddUserModal onClose={closeAddUserModal} onAdd={handleAddUser} />
      )}
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
              placeholder="Department"
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
              placeholder="All statuses"
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
                  <>
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
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Users;
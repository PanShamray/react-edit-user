import React from 'react';
import "./style.scss";

function EditUser() {
    return (
      <main>
        <h1>EDIT USER</h1>
        <section>
          <h4>User</h4>
          <p>Oleg Schevchenko</p>

          <div className="userInfo">
            <h3>User Information</h3>

            <div className="nameAndDepartment">
              <div className="nameBlock">
                <h4>Full Name</h4>
                <p>Oleg Schevchenko</p>
              </div>
              <div className="departmentBlock">
                <h4>Department</h4>
                <p>Digital Marketing</p>
              </div>
            </div>

            <div className="countryAndStatus">
              <div className="countryBlock">
                <h4>Country</h4>
                <p>United States</p>
              </div>
              <div className="statusBlock">
                <h4>Status</h4>
                <p>Active</p>
              </div>
            </div>
          </div>

          <div className="undoAndSave">
            <button className="undoButton">Undo</button>
            <button className="saveButton">Save</button>
          </div>
        </section>
      </main>
    );
}

export default EditUser;
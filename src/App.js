import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import EditUser from "./pages/EditUser/EditUser";
import Users from "./pages/Users/Users";

import "./App.scss";

function App() {
  return (
    <Router>
      <div>
        <header className="header">
          <nav>
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? "activeButton" : "inactiveButton"}
            >
              Edit Users
            </NavLink>

            <NavLink
              to="/users"
              className={({ isActive }) => isActive ? "activeButton" : "inactiveButton"}
            >
              Users
            </NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<EditUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

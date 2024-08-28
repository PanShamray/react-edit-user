import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EditUser from "./pages/EditUser/EditUser"
import Users from "./pages/Users/Users";

import "./App.scss";

function App() {
  return (
    <Router>
      <div>
        <header className="header">
          <nav>
            <Link to="/">
              <button className="editUserButton">Edit Users</button>
            </Link>

            <Link to="/users">
              <button className="usersButton">Users</button>
            </Link>
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

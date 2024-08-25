import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EditUser from "./pages/EditUser/EditUser"
import Users from "./pages/Users/Users";

function App() {
  return (
    <Router>
      <div>
        <button>
          <Link to="/edit-user">Edit User</Link>
        </button>
        <button>
          <Link to="/">Users</Link>
        </button>

        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/edit-user" element={<EditUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

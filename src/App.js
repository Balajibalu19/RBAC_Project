import React from "react";
import { HashRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom"; // Change to HashRouter
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import PermissionManagement from "./components/PermissionManagement";

function Navigation() {
  const location = useLocation(); // This gives us the current route

  // Function to add dynamic classes to active links
  const getLinkClass = (path) => {
    return location.pathname === path
      ? "text-white bg-purple-600 hover:bg-purple-700"
      : "text-gray-700 hover:text-white hover:bg-purple-600";
  };

  return (
    <nav className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-4 rounded-md mb-8 shadow-lg">
      <ul className="flex justify-center space-x-8">
        <li>
          <Link
            to="/"
            className={`text-xl font-semibold py-2 px-4 rounded-md transition-all duration-300 ${getLinkClass("/")}`}
          >
            User Management
          </Link>
        </li>
        <li>
          <Link
            to="/roles"
            className={`text-xl font-semibold py-2 px-4 rounded-md transition-all duration-300 ${getLinkClass("/roles")}`}
          >
            Role Management
          </Link>
        </li>
        <li>
          <Link
            to="/permissions"
            className={`text-xl font-semibold py-2 px-4 rounded-md transition-all duration-300 ${getLinkClass("/permissions")}`}
          >
            Permission Management
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router> {/* Use HashRouter here */}
      <div className="min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-8">
        <div className="container mx-auto bg-white p-6 rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
            RBAC Admin Dashboard
          </h1>

          {/* Navigation */}
          <Navigation />

          {/* Routes */}
          <Routes>
            <Route path="/" element={<UserManagement />} />
            <Route path="/roles" element={<RoleManagement />} />
            <Route path="/permissions" element={<PermissionManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;








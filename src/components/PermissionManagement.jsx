import React, { useState } from "react";
import { roles, permissions } from "../data/mockData";

const PermissionManagement = () => {
  const [roleList, setRoleList] = useState(roles);
  const [editingRole, setEditingRole] = useState(null);
  const [tempPermissions, setTempPermissions] = useState([]);
  const [bulkSelected, setBulkSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handlePermissionToggle = (permission) => {
    setTempPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((perm) => perm !== permission)
        : [...prev, permission]
    );
  };

  const saveChanges = (roleId) => {
    setRoleList((prevRoles) =>
      prevRoles.map((role) =>
        role.id === roleId ? { ...role, permissions: tempPermissions } : role
      )
    );
    setEditingRole(null);
    setTempPermissions([]);
    alert("Changes saved successfully!");
  };

  const toggleBulkSelect = (roleId) => {
    setBulkSelected((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId]
    );
  };

  const applyBulkPermissions = (permission) => {
    setRoleList((prevRoles) =>
      prevRoles.map((role) =>
        bulkSelected.includes(role.id)
          ? {
              ...role,
              permissions: role.permissions.includes(permission)
                ? role.permissions.filter((perm) => perm !== permission)
                : [...role.permissions, permission],
            }
          : role
      )
    );
    setBulkSelected([]);
  };

  const filteredRoles = roleList.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg shadow-xl transition-all duration-500">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800 tracking-tight">
        Permission Management
      </h2>

      {/* Centered Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search roles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-2/3 md:w-1/3 p-4 rounded-full border border-indigo-300 shadow-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all placeholder-gray-500 text-gray-700 text-lg"
        />
      </div>

      {/* Bulk Actions */}
      {bulkSelected.length > 0 && (
        <div className="mb-8 flex justify-center items-center space-x-6">
          <button
            onClick={() => applyBulkPermissions("READ")}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all duration-300"
          >
            Add "READ" to Selected
          </button>
          <button
            onClick={() => setBulkSelected([])}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-200 transition-all duration-300"
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoles.map((role) => (
          <div
            key={role.id}
            className={`bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl ${
              bulkSelected.includes(role.id) && "ring-4 ring-indigo-300"
            }`}
            onClick={() => toggleBulkSelect(role.id)}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">{role.name}</h3>

            {/* Permissions */}
            {editingRole === role.id ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {permissions.map((perm) => (
                  <label key={perm} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={tempPermissions.includes(perm)}
                      onChange={() => handlePermissionToggle(perm)}
                      className="h-5 w-5 text-indigo-500 border-gray-300 rounded focus:ring-indigo-400"
                    />
                    <span className="text-lg text-gray-700">{perm}</span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">
                {role.permissions.length > 0
                  ? role.permissions.join(", ")
                  : "No permissions assigned"}
              </p>
            )}

            {/* Actions */}
            <div className="mt-6 flex justify-end space-x-4">
              {editingRole === role.id ? (
                <>
                  <button
                    onClick={() => saveChanges(role.id)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all duration-300"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingRole(null)}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setEditingRole(role.id);
                    setTempPermissions(role.permissions);
                  }}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-300"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionManagement;








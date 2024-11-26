import React, { useState } from "react";
import Modal from "./Modal"; // Assuming you already have this Modal component

const RoleManagement = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "User", permissions: ["Read"] },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  const permissionsList = ["Read", "Write", "Delete", "Edit"];

  const openAddRoleModal = () => {
    setCurrentRole({ id: null, name: "", permissions: [] });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditRoleModal = (role) => {
    setCurrentRole(role);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteRole = (roleId) => {
    setRoleToDelete(roleId);
    setIsConfirmDelete(true);
  };

  const confirmDelete = () => {
    setRoles(roles.filter((role) => role.id !== roleToDelete));
    setIsConfirmDelete(false);
    setRoleToDelete(null);
  };

  const cancelDelete = () => {
    setIsConfirmDelete(false);
    setRoleToDelete(null);
  };

  const saveRole = (role) => {
    if (!role.name.trim()) {
      setError("Role name cannot be empty.");
      return;
    }
    if (role.permissions.length === 0) {
      setError("At least one permission must be selected.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      if (isEditing) {
        setRoles(roles.map((r) => (r.id === role.id ? role : r)));
      } else {
        setRoles([...roles, { ...role, id: Date.now() }]);
      }
      setIsLoading(false);
      setIsModalOpen(false);
      setError("");
    }, 1000); // Simulating async action
  };

  const handleTogglePermission = (permission) => {
    setCurrentRole((prev) => {
      const hasPermission = prev.permissions.includes(permission);
      return {
        ...prev,
        permissions: hasPermission
          ? prev.permissions.filter((perm) => perm !== permission)
          : [...prev.permissions, permission],
      };
    });
  };

  const handleNameChange = (e) => {
    setCurrentRole({ ...currentRole, name: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Manage Roles</h2>

      {/* Add Role Button */}
      <button
        onClick={openAddRoleModal}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Add New Role
      </button>

      {/* Role List with Card Layout */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div
            key={role.id}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-700">{role.name}</h3>
            <p className="text-gray-600 mt-2">
              Permissions: {role.permissions.join(", ") || "No Permissions"}
            </p>

            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => openEditRoleModal(role)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteRole(role.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal for Delete */}
      {isConfirmDelete && (
        <Modal isOpen={isConfirmDelete} onClose={cancelDelete} title="Confirm Deletion">
          <div className="space-y-4">
            <p>Are you sure you want to delete this role? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal for Adding or Editing Role */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "Edit Role" : "Add New Role"}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveRole(currentRole);
          }}
          className="space-y-4"
        >
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label htmlFor="roleName" className="block text-sm font-medium text-gray-700">
              Role Name
            </label>
            <input
              id="roleName"
              type="text"
              value={currentRole?.name || ""}
              onChange={handleNameChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter role name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Permissions</label>
            <div className="mt-2 space-y-2">
              {permissionsList.map((perm) => (
                <label key={perm} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={currentRole?.permissions.includes(perm)}
                    onChange={() => handleTogglePermission(perm)}
                    className="form-checkbox"
                  />
                  <span>{perm}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Saving...' : 'Save Role'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RoleManagement;











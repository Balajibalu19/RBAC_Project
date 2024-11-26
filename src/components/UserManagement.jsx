import React, { useState } from "react";
import Modal from "./Modal";
import { users, roles } from "../data/mockData";

const UserManagement = () => {
  const [userList, setUserList] = useState(users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUserList(userList.filter((user) => user.id !== userId));
    }
  };

  const handleSaveUser = (user) => {
    if (isEditing) {
      setUserList(
        userList.map((existingUser) =>
          existingUser.id === user.id ? user : existingUser
        )
      );
    } else {
      setUserList([
        ...userList,
        { ...user, id: Date.now(), status: "Active" },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleToggleStatus = (userId) => {
    setUserList(
      userList.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
          : user
      )
    );
  };

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-xl shadow-xl">
      <h2 className="text-4xl font-bold mb-6 text-gray-900 text-center">User Management</h2>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-700 text-lg">
          Manage your application users effectively.
        </p>
        <button
          className="px-5 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all"
          onClick={handleAddUser}
        >
          <i className="fas fa-plus mr-2"></i>Add User
        </button>
      </div>
      <table className="w-full border-collapse bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Role</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr
              key={user.id}
              className="border-b bg-white hover:bg-gray-50 transition-all"
            >
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.role}</td>
              <td
                className={`px-6 py-4 cursor-pointer ${
                  user.status === "Active" ? "text-green-600" : "text-red-600"
                }`}
                onClick={() => handleToggleStatus(user.id)}
              >
                {user.status}
              </td>
              <td className="px-6 py-4 flex items-center space-x-3">
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 transition-all"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:ring-4 focus:ring-red-300 transition-all"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={isEditing ? "Edit User" : "Add User"}
        >
          <UserForm
            user={selectedUser}
            roles={roles}
            onSave={handleSaveUser}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

const UserForm = ({ user, roles, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    user || { name: "", role: roles[0]?.name || "", status: "Active" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() === "") {
      alert("Name is required!");
      return;
    }
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block">
        <span className="text-gray-800 font-medium">Name:</span>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 w-full p-3 mt-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </label>
      <label className="block">
        <span className="text-gray-800 font-medium">Role:</span>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border border-gray-300 w-full p-3 mt-2 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          {roles.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>
      </label>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default UserManagement;






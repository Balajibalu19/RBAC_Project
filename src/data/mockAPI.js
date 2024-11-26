// mockAPI.js

let roles = [
    { id: 1, name: "Admin", permissions: ["view", "edit", "delete"] },
    { id: 2, name: "User", permissions: ["view"] },
  ];
  
  let users = [
    { id: 1, name: "John Doe", role: "Admin" },
    { id: 2, name: "Jane Smith", role: "User" },
  ];
  
  // Simulate fetching roles from the server
  export const fetchRoles = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(roles), 1000);  // Simulating network delay
    });
  };
  
  // Simulate fetching users from the server
  export const fetchUsers = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(users), 1000);  // Simulating network delay
    });
  };
  
  // Simulate adding a new role
  export const addRole = (role) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newRole = { id: roles.length + 1, ...role };
        roles.push(newRole);
        resolve(newRole);
      }, 1000);  // Simulating network delay
    });
  };
  
  // Simulate adding a new user
  export const addUser = (user) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newUser = { id: users.length + 1, ...user };
        users.push(newUser);
        resolve(newUser);
      }, 1000);  // Simulating network delay
    });
  };
  
  // Simulate updating a role
  export const updateRole = (updatedRole) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = roles.findIndex((role) => role.id === updatedRole.id);
        if (index === -1) {
          reject("Role not found");
        } else {
          roles[index] = updatedRole;
          resolve(updatedRole);
        }
      }, 1000);  // Simulating network delay
    });
  };
  
  // Simulate updating a user
  export const updateUser = (updatedUser) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = users.findIndex((user) => user.id === updatedUser.id);
        if (index === -1) {
          reject("User not found");
        } else {
          users[index] = updatedUser;
          resolve(updatedUser);
        }
      }, 1000);  // Simulating network delay
    });
  };
  
  // Simulate deleting a role
  export const deleteRole = (roleId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = roles.findIndex((role) => role.id === roleId);
        if (index === -1) {
          reject("Role not found");
        } else {
          roles.splice(index, 1);
          resolve("Role deleted");
        }
      }, 1000);  // Simulating network delay
    });
  };
  
  // Simulate deleting a user
  export const deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = users.findIndex((user) => user.id === userId);
        if (index === -1) {
          reject("User not found");
        } else {
          users.splice(index, 1);
          resolve("User deleted");
        }
      }, 1000);  // Simulating network delay
    });
  };
  
  
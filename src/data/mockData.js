export const users = [
  { id: 1, name: 'John Doe', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', role: 'User', status: 'Inactive' },
  { id: 3, name: 'Alice Johnson', role: 'Editor', status: 'Active' },
  { id: 4, name: 'Bob Brown', role: 'User', status: 'Active' },
  { id: 5, name: 'Charlie Williams', role: 'Admin', status: 'Inactive' },
  { id: 6, name: 'David Lee', role: 'Editor', status: 'Active' },
  { id: 7, name: 'Eve Taylor', role: 'User', status: 'Active' },  // New user added
  { id: 8, name: 'Frank Miller', role: 'Editor', status: 'Inactive' },  // New user added
  { id: 9, name: 'Grace Adams', role: 'Admin', status: 'Active' },  // New user added
];

  
  export const roles = [
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "Editor", permissions: ["Read", "Write"] },
    { id: 3, name: "Viewer", permissions: ["Read"] },
  ];
  
  export const permissions = ["Read", "Write", "Delete"];
  
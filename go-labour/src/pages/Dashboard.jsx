// src/pages/Dashboard.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

function Dashboard() {
  const location = useLocation();

  let role = '';
  if (location.pathname.includes('employee')) role = 'employee';
  else if (location.pathname.includes('employer')) role = 'employer';
  else if (location.pathname.includes('admin')) role = 'admin';

  return (
    <div>
      <h1>{role.toUpperCase()} Dashboard</h1>
      {/* Render content based on role */}
      {role === 'employee' && <p>Welcome, Employee!</p>}
      {role === 'employer' && <p>Post and manage job listings here.</p>}
      {role === 'admin' && <p>Manage users and control the system.</p>}
    </div>
  );
}

export default Dashboard;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear stored user data
    localStorage.removeItem('user');

    // Redirect to login page
    navigate('/login');
  }, [navigate]);

  return <p>Logging out...</p>;
};

export default Logout;

import React from 'react';
import { Button, MenuItem } from '@mui/material';
import { useLogout } from '../Admin/Admin_Component/UserContext';

const LogoutButton = () => {
  const logout = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <MenuItem onClick={handleLogout}>Logout</MenuItem>
  );
};

export default LogoutButton;

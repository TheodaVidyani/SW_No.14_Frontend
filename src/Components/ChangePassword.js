import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Paper, Grid, CircularProgress, Box } from '@mui/material';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState(''); // Added for username input
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3100/api/router_login/changePassword', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          username,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to change password');
      }

      alert('Password changed successfully');
      navigate('/profile');
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: '500px', backgroundColor: '#ffffff', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold', textAlign: 'center' }}>Change Password</Typography>
        <form onSubmit={handleChangePassword}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                fullWidth
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Current Password"
                type="password"
                fullWidth
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="New Password"
                type="password"
                fullWidth
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button type="submit" variant="contained" sx={{ backgroundColor: '#1976d2', color: '#fff' }} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Change Password'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default ChangePassword;

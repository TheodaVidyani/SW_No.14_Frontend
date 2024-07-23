import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Avatar, Grid, Paper, Dialog, DialogTitle, DialogContent, Divider, CircularProgress, Snackbar } from '@mui/material';
import UserProfileUpdate from './UserProfileUpdate';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    console.log('userData updated:', userData);
  }, [userData]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://helthlabback.vercel.app/api/router_login/getCurrentUser', {
        withCredentials: true,
      });

      const data = response.data;

      if (!data || !data.username) {
        throw new Error('Invalid user data received');
      }

      setUserData(data);
    } catch (error) {
      setError('Failed to fetch user data.');
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Paper
      style={{
        padding: '20px 40px',
        backgroundColor: '#D3E9FE',
        borderRadius: '15px',
        boxShadow: '1px 5px 3px -3px rgba(0,0,0,0.44)',
        width: '80%',
        margin: 'auto',
        marginTop: '40px'
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : userData ? (
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} md={4} style={{ display: 'flex' }}>
            <Paper
              style={{
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '1px 3px 3px -3px rgba(0,0,0,0.2)',
                flex: 1
              }}
            >
              <Grid container spacing={2} direction="column" alignItems="center">
                <Grid item>
                  <Avatar
                    src={userData.profilePic}
                    alt="User Profile"
                    style={{ width: '120px', height: '120px', marginBottom: '10px' }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h6" style={{ marginBottom: '10px' }}>
                    {userData.username}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" style={{ marginBottom: '10px' }}>
                    {userData.role}
                  </Typography>
                </Grid>
                <Grid item container spacing={2} justifyContent="center">
                  <Grid item>
                    <Button
                      onClick={handleOpen}
                      variant="contained"
                      style={{
                        backgroundColor: '#101754',
                        color: '#fff',
                        '&:hover': { backgroundColor: '#1e88e5' }
                      }}
                    >
                      Edit Profile
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      component={Link}
                      to="/changePassword"
                      variant="contained"
                      style={{
                        color: '#0085FF',
                        backgroundColor: '#fff',
                        border: '1px solid #0085FF'
                      }}
                    >
                      Change Password
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8} style={{ display: 'flex' }}>
            <Paper
              style={{
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '1px 3px 3px -3px rgba(0,0,0,0.2)',
                flex: 1
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                style={{
                  marginBottom: '20px',
                  fontSize: '30px',
                  color: '#0085FF',
                  fontWeight: 'bold'
                }}
              >
                User Profile
              </Typography>

              {['firstname', 'lastname', 'email', 'address', 'nationalID', 'phonenumber'].map((field, idx) => (
                <React.Fragment key={field}>
                  <Grid container alignItems="center" style={{ marginBottom: '20px', paddingTop: '10px' }}>
                    <Grid item xs={4}>
                      <Typography variant="subtitle1">
                        {field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="subtitle1" style={{ textAlign: 'left', paddingLeft: '70px' }}>
                        {userData[field]}
                      </Typography>
                    </Grid>
                  </Grid>
                  {idx < 5 && <Divider style={{ marginBottom: '10px' }} />}
                </React.Fragment>
              ))}
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Typography>Loading...</Typography>
      )}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <UserProfileUpdate userData={userData} onClose={handleClose} onProfileUpdate={fetchUserData} />
        </DialogContent>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default Profile;

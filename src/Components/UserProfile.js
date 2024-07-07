//UserProfile.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Avatar, Grid, Paper, Dialog, DialogTitle, DialogContent, Divider, CircularProgress, Snackbar } from '@mui/material';
import UserProfileUpdate from './UserProfileUpdate';
import MuiAlert from '@mui/material/Alert';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Profile = () => {
  const [userData, setUserData] = useState(null); // userData: State variable to hold user data fetched from the backend.
  const [open, setOpen] = useState(false); // open: State variable to manage the open/close state of the dialog for updating user profile.
  const [loading, setLoading] = useState(true); // Loading state while fetching user data.
  const [error, setError] = useState(null); // Error state for handling fetch errors.
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar open/close.
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Message to display in the snackbar.
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Severity of the snackbar (success, error, warning, info).


  useEffect(() => { // useEffect hook runs once when the component mounts.
    console.log('Profile component mounted.');
    fetchUserData(); // Hook calls the fetchUserData function to fetch user data from the backend.
  }, []);

  useEffect(() => {
    console.log('userData updated:', userData); // Log whenever userData state changes.
  }, [userData]);

  const fetchUserData = async () => { // Fetch User Data Function: This function sends a GET request to the backend API endpoint to fetch user data.
    try {
      console.log('Fetching user data...'); // Log before fetching user data.
      const response = await fetch('http://localhost:3100/api/router_login/getCurrentUser', {
        credentials: 'include', // Ensure cookies are sent with the request. (In frontend, when making API requests with Axios or Fetch, include credentials: 'include' to ensure cookies are sent.)
      });

      console.log('Response:', response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`); // Throw error if HTTP request fails.
      }

      console.log('User data fetched successfully.'); // Log when user data is fetched successfully.
     
      const data = await response.json(); // Parse JSON response.
      console.log('Fetched user data:', data); // Log the fetched user data.
      
      if (!data || !data.username) {
        throw new Error('Invalid user data received');
      }

      setUserData(data); // Assuming `data` is the user object itself, // Set the fetched user data to state.
    } catch (error) {
      console.error('Error fetching user data:', error); // Log any errors that occur during fetch.
      setError('Failed to fetch user data.'); // Set error state if fetch fails.
    } finally {
      setLoading(false); // Set loading state to false after fetch completes.
    }
  };

  // Dialog Open/Close Handlers: These functions manage the open and close state of the dialog for updating user profile
  const handleOpen = () => {
    console.log('Opening edit profile dialog...'); // Log when the edit profile dialog opens.
    setOpen(true);
  };

  const handleClose = () => {
    console.log('Closing edit profile dialog...'); // Log when the edit profile dialog closes.
    setOpen(false); // Close the edit profile dialog.
  };

  //below functions no use - cuz we implemented userProfileUpdate.js

  // const handleProfileUpdate = async (updatedData) => {
  //   console.log('Updating profile with:', updatedData); // Log the updated data when profile update is triggered.
  //   setUserData(updatedData); // Update user data with the new data.
  //   handleClose(); // Close the edit profile dialog.
  //   setSnackbarMessage('Profile updated successfully.'); // Set success message for snackbar.
  //   setSnackbarSeverity('success'); // Set snackbar severity to success.
  //   setSnackbarOpen(true); // Open the snackbar.
  // };

  // const handleProfileUpdateError = (errorMessage) => {
  //   console.error('Profile update error:', errorMessage); // Log the profile update error.
  //   setSnackbarMessage(errorMessage); // Set error message for snackbar.
  //   setSnackbarSeverity('error'); // Set snackbar severity to error.
  //   setSnackbarOpen(true); // Open the snackbar.
  // };

  const handleSnackbarClose = () => {
    console.log('Closing snackbar...'); // Log when the snackbar closes.
    setSnackbarOpen(false); // Close the snackbar.
  };

  return (
    <Paper style={{ padding: '20px 40px', 
    backgroundColor: '#D3E9FE', 
    borderRadius: '15px', 
    boxShadow: '1px 5px 3px -3px rgba(0,0,0,0.44)', 
    width: '80%', 
    margin: 'auto', 
    marginTop: '40px' 
    }}
    >
       {loading ? (
        <CircularProgress /> // Show loading spinner while fetching user data.
      ) : error ? (
        <Typography color="error">{error}</Typography> // Show error message if fetch fails.
      ) :
      // {/* Material-UI Paper component used to create a styled container for the user profile display. */}
      userData ? (
        <Grid container spacing={2} alignItems="stretch">
          {/* Grid Component: arrange the profile details in a grid layout. */}
          <Grid item xs={12} md={4} style={{ display: 'flex' }}>
            {/* First Box */}
            <Paper style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '1px 3px 3px -3px rgba(0,0,0,0.2)', flex: 1 }}>
              <Grid container spacing={2} direction="column" alignItems="center">
                <Grid item>
                  <Avatar src={userData.profilePic} alt="User Profile" style={{ width: '120px', height: '120px', marginBottom: '10px' }} />
                </Grid>
                <Grid item>
                  <Typography variant="h6" style={{ marginBottom: '10px' }}>{userData.username}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" style={{ marginBottom: '10px' }}>{userData.role}</Typography>
                </Grid>
                <Grid item container spacing={2} justifyContent="center">
                  <Grid item>
                    <Button 
                    onClick={handleOpen} 
                    variant="contained" 
                    style={{ backgroundColor: '#101754', color: '#fff', '&:hover': { backgroundColor: '#1e88e5' } }}>
                    Edit Profile
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button component={Link} to="/changePassword" variant="contained" 
                    style={{ 
                      color: '#0085FF', 
                      //  blue text color
                      backgroundColor: '#fff',
                      // white background color
                      border: '1px solid #0085FF', 
                      // blue border
                      }}>Change Password</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8} style={{ display: 'flex' }}>
            {/* Second Box */}
            <Paper 
            style={{ 
              padding: '20px', 
              backgroundColor: '#fff', 
              borderRadius: '10px', 
              boxShadow: '1px 3px 3px -3px rgba(0,0,0,0.2)', 
              flex: 1 
            }}
            >
              <Typography variant="h4" gutterBottom style={{ marginBottom: '20px', fontSize: '30px', color: '#0085FF', fontWeight: 'bold' }}>User Profile</Typography>
              
              {['firstname', 'lastname', 'email', 'address', 'nationalID', 'phonenumber'].map((field, idx) => (
                <React.Fragment key={field}>
                  <Grid container alignItems="center" style={{ marginBottom: '20px', paddingTop: '10px' }}>
                    <Grid item xs={4}>
                      <Typography variant="subtitle1">{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="subtitle1" style={{ textAlign: 'left', paddingLeft: '70px' }}>{userData[field]}</Typography>
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
        {/* Dialog Component: This is a Material-UI Dialog component used to display the form for updating user profile.
    It passes userData and onClose function as props to the UserProfileUpdate component. */}
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <UserProfileUpdate userData={userData} onClose={handleClose} />
        </DialogContent>
      </Dialog>
      
        <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default Profile;

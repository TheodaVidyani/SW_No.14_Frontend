import React, { useState } from "react";
import { Grid, Typography, TextField, Button, Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import photo from '../images/HealthLabLogo.jpg';
import { toast, Toaster } from 'react-hot-toast';

const Signin = () => {
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    nationalID: '',
    phonenumber: '',
    role: '',
    username: '',
    password: ''
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({ field: '', message: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validateNationalID = (id) => {
    const idRegex1 = /^[0-9]{9}V$/i;
    const idRegex2 = /^[0-9]{12}$/;
    return idRegex1.test(id) || idRegex2.test(id);
  };


  //Minimum Length: Ensure the password is at least 8 characters long.
  //Special Characters: Require at least one special character.
  //Uppercase Letters: Require at least one uppercase letter.
  //Numbers: Require at least one digit.

  const validatePassword = (password) => {
    // Password must be at least 8 characters long and contain at least one special character, uppercase letter, and digit
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any field is empty
    for (let key in data) {
      if (data[key] === '') {
        setError({ field: key, message: 'This field is required' });
        return;
      }
    }

    if (data.password !== confirmPassword) {
      setError({ field: 'confirmPassword', message: 'Confirm Password does not match' });
      return;
    }

    if (!validateEmail(data.email)) {
      setError({ field: 'email', message: 'Invalid email format' });
      return;
    }

    if (!validatePhoneNumber(data.phonenumber)) {
      setError({ field: 'phonenumber', message: 'Phone number must contain exactly 10 digits' });
      return;
    }

    if (!validateNationalID(data.nationalID)) {
      setError({ field: 'nationalID', message: 'Invalid national ID format' });
      return;
    }

    if (!validatePassword(data.password)) {
      setError({ field: 'password', message: 'Password must be at least 8 characters long and contain at least one special character, uppercase letter, and digit' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3100/api/router_login/createuser', data);
      console.log('Server response:', response);

      if (response.data.error === false) {
        setError({ field: response.data.field, message: response.data.message });
      } else {
        setError({ field: '', message: '' });
        setData({
          firstname: '',
          lastname: '',
          email: '',
          address: '',
          nationalID: '',
          phonenumber: '',
          role: '',
          username: '',
          password: ''
        });

        const successMessage = data.role === 'PATIENT' ? 'User Registered Successfully' : 'Registration Pending';
        console.log('Displaying toast message:', successMessage);
        toast.success(successMessage, {
          duration: 4000, // Toast duration set to 4 seconds
        });

        setTimeout(() => {
          navigate('/HomePage');
        }, 4000); // Navigate to HomePage after 4 seconds
      }
    } catch (error) {
      console.error('Error registering user:', error);
      if (error.response && error.response.status === 409) { //duplicate username of NationalID
        setError({ field: error.response.data.field, message: error.response.data.message });
      } else {
        setError({ field: '', message: 'Error registering user: ' + error.message });
      }
    }
  };

  return (
    <Grid container justifyContent="center">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        style={{
          borderRadius: "15px",
          padding: "20px 40px",
          backgroundColor: "#D3E9FE",
          width: "65%",
          boxShadow: "1px 5px 3px -3px rgba(0,0,0,0.44)"
        }}
      >
        <Grid container justifyContent="center">
          <img
            src={photo}
            style={{ width: "100%", maxWidth: "300px", marginTop: "15px", marginBottom: "25px" }}
            alt="HealthLab Logo"
          />
        </Grid>
        <Typography variant="h5" align="center" style={{ marginBottom: "5%", fontSize: "30px", color: "#0085FF", fontWeight: "bold" }}>
          Sign In
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              name="firstname"
              value={data.firstname}
              onChange={handleChange}
              style={{ marginBottom: "20px" }}
              error={error.field === 'firstname'}
              helperText={error.field === 'firstname' ? error.message : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              name="lastname"
              value={data.lastname}
              onChange={handleChange}
              style={{ marginBottom: "20px" }}
              error={error.field === 'lastname'}
              helperText={error.field === 'lastname' ? error.message : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={data.email}
              onChange={handleChange}
              style={{ marginBottom: "20px" }}
              error={error.field === 'email'}
              helperText={error.field === 'email' ? error.message : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Address"
              variant="outlined"
              name="address"
              value={data.address}
              onChange={handleChange}
              style={{ marginBottom: "20px" }}
              error={error.field === 'address'}
              helperText={error.field === 'address' ? error.message : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="National ID number"
              variant="outlined"
              name="nationalID"
              value={data.nationalID}
              onChange={handleChange}
              style={{ marginBottom: "20px" }}
              error={error.field === 'nationalID'}
              helperText={error.field === 'nationalID' ? error.message : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              name="phonenumber"
              value={data.phonenumber}
              onChange={handleChange}
              style={{ marginBottom: "20px" }}
              error={error.field === 'phonenumber'}
              helperText={error.field === 'phonenumber' ? error.message : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                name="role"
                value={data.role}
                onChange={handleChange}
                label="Role"
                error={error.field === 'role'}
              >
                <MenuItem value="PATIENT">Patient</MenuItem>
                <MenuItem value="DOCTOR">Doctor</MenuItem>
                <MenuItem value="ADMIN">Admin</MenuItem>
                <MenuItem value="LABOPERATOR">Lab Operator</MenuItem>
                <MenuItem value="LABASSISTANT">Lab Assistant</MenuItem>
              </Select>
              {error.field === 'role' && (
                <Typography variant="body2" color="error">{error.message}</Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              name="username"
              value={data.username}
              onChange={handleChange}
              style={{ marginBottom: "20px" }}
              error={error.field === 'username'}
              helperText={error.field === 'username' ? error.message : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              style={{ marginBottom: "20px" }}
              error={error.field === 'password'}
              helperText={error.field === 'password' ? error.message : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              style={{ marginBottom: "20px" }}
              error={error.field === 'confirmPassword'}
              helperText={error.field === 'confirmPassword' ? error.message : ''}
            />
          </Grid>

          {error.message && (
            <Grid item xs={12}>
              <Typography variant="body2" color="error">{error.message}</Typography>
            </Grid>
          )}

        </Grid>

        <Typography variant="body1" style={{ marginBottom: "20px", color: "#9C1C1C" }}>
          Already have an account? <Link to="/Login">Login</Link>
        </Typography>

        <Button
          type='submit'
          sx={{ variant: 'contained', color: '#FFFFFF', background: '#101754', width: '100%', height: '50px' }}
        >
          Sign In
        </Button>
      </form>
    </Grid>
  );
};

export default Signin;

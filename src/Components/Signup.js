import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import photo from "../images/HealthLabLogo.jpg";
import { toast, Toaster } from "react-hot-toast";

const Signup = () => {
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    gender: '',
    dob: '',
    nationalID: '',
    phonenumber: '',
    role: '',
    username: '',
    password: ''
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState(null);
  const [error, setError] = useState({ field: '', message: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    const age = today.getFullYear() - selectedDate.getFullYear();
    const monthDifference = today.getMonth() - selectedDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < selectedDate.getDate())) {
      setAge(age - 1);
    } else {
      setAge(age);
    }
    handleChange(e);
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

  const validatePassword = (password) => {
    // Password must be at least 8 characters long and contain at least one special character, uppercase letter, and digit
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const userData = { ...data };
  
    // Set nationalID to null if the user is under 16 and the field is empty
    if (age < 16 && userData.nationalID === '') {
      userData.nationalID = '';
    }
  
    // Check for required fields except for nationalID
    for (let key in userData) {
      if (key !== 'nationalID' && userData[key] === '') {
        setError({ field: key, message: 'This field is required' });
        return;
      }
    }
  
    // Validate nationalID for users 16 or older
    if (age >= 16 && userData.nationalID === '') {
      setError({ field: 'nationalID', message: 'National ID is required for users above the age of 16' });
      return;
    }
  
    if (age >= 16 && !validateNationalID(userData.nationalID)) {
      setError({ field: 'nationalID', message: 'Invalid national ID format' });
      return;
    }
  
    // Validate confirm password
    if (userData.password !== confirmPassword) {
      setError({ field: 'confirmPassword', message: 'Confirm Password does not match' });
      return;
    }
  
    // Validate email format
    if (!validateEmail(userData.email)) {
      setError({ field: 'email', message: 'Invalid email format' });
      return;
    }
  
    // Validate phone number format
    if (!validatePhoneNumber(userData.phonenumber)) {
      setError({ field: 'phonenumber', message: 'Phone number must contain exactly 10 digits' });
      return;
    }
  
    // Validate password format
    if (!validatePassword(userData.password)) {
      setError({ field: 'password', message: 'Password must be at least 8 characters long and contain at least one special character, uppercase letter, and digit' });
      return;
    }
  
    // Prepare the final data object for the request
    const requestData = { ...userData };
  
    try {
      const response = await axios.post('https://healthlabback-git-vercelback-bytebuzzers-projects.vercel.app/api/router_login/createuser', requestData);
      console.log('Server response:', response);
  
      if (!response.data.success) {
        setError({ field: response.data.field, message: response.data.message });
      } else {
        setError({ field: '', message: '' });
        setData({
          firstname: '',
          lastname: '',
          email: '',
          address: '',
          gender: '',
          dob: '',
          nationalID: '',
          phonenumber: '',
          role: '',
          username: '',
          password: ''
        });
  
        const successMessage = userData.role === 'PATIENT' ? 'User Registered Successfully' : 'Registration Pending';
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
      if (error.response && error.response.status === 409) { // Duplicate username or NationalID
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
          Sign Up
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
              type="date"
              label="Date of Birth"
              variant="outlined"
              name="dob"
              value={data.dob}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginBottom: "20px" }}
              error={error.field === "dob"}
              helperText={
                error.field === "dob" ? error.message : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="gender-select-label">Gender</InputLabel>
              <Select
                labelId="gender-select-label"
                id="gender-select"
                name="gender"
                value={data.gender}
                onChange={handleChange}
                label="Gender"
                style={{ marginBottom: "20px" }}
                error={error.field === "gender"}
                helperText={
                  error.field === "gender" ? error.message : ""
                }
              >
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="National ID number"
              variant="outlined"
              name="nationalID"
              value={data.nationalID}
              onChange={handleChange}
              required={age >= 16}
              style={{ marginBottom: "5px" }}
              error={error.field === 'nationalID'}
              helperText={error.field === 'nationalID' ? error.message : ''}
            />
            {/* //Comment */}
            <Typography variant="body2" color="textSecondary" style={{ marginBottom: "20px" }}>
              Required only for users above the age of 16
            </Typography>
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
          Sign Up
        </Button>
      </form>
    </Grid>
  );
};

export default Signup;

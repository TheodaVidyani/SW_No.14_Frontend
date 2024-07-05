import React, { useState } from 'react';
import { Grid, Typography, TextField, Button } from "@mui/material";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import forgotPasswordImage from '../images/forgotpassword.png'; // Adjust path as per your project structure
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleSendCode = async () => {
    console.log('Sending verification code to:', email);
    try {
      const response = await axios.post('http://localhost:3100/api/router_login/send-verification-code', { email });
      console.log('Response from sending code:', response.data);
      toast.success(response.data.message);
      setStep(2);
    } catch (error) {
      console.error('Error sending verification code:', error);
      toast.error('Failed to send verification code');
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      console.error('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    console.log('Resetting password with:', { email, code, newPassword });
    try {
      const response = await axios.post('http://localhost:3100/api/router_login/verify-code-and-reset-password', { email, code, newPassword });
      console.log('Response from resetting password:', response.data);
      toast.success(response.data.message);
      setStep(1);
      setEmail('');
      setCode('');
      setNewPassword('');
      setConfirmNewPassword('');
      // Redirect to dashboard after successful password reset
      navigate('/dashboard'); // Replace '/dashboard' with the correct route for the user's dashboard
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('Failed to reset password');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted, current step:', step);
    if (step === 1) {
      console.log('Step 1: Sending verification code');
      handleSendCode();
    } else {
      console.log('Step 2: Resetting password');
      handleResetPassword();
    }
  };

  return (
    <Grid container justifyContent="center">
      <form
        onSubmit={handleSubmit}
        style={{
          borderRadius: "15px",
          padding: "20px",
          backgroundColor: "#FFFFFF",
          width: "90%",
          maxWidth: "800px",
          marginTop: "8%",
          boxShadow: "1px 5px 3px -3px rgba(0,0,0,0.44)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "10px solid #A6D1F2 " // Blue border
        }}
      >
        {step === 1 ? (
          <>
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
              <img src={forgotPasswordImage} alt="Forgot Password" style={{ width: "200px", marginBottom: "20px" }} />
              <Typography
                variant="h5"
                style={{
                  color: "#0085FF",
                  fontWeight: "bold",
                  marginBottom: "30px",
                }}
              >
                Enter your email address to reset your password
              </Typography>
            </div>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => {
                console.log('Email input changed:', e.target.value);
                setEmail(e.target.value);
              }}
              style={{ marginBottom: "60px" }}
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              style={{ borderRadius: "20px", width: "50%", padding: "8px", marginBottom: "20px" }}
            >
              Send Verification Code
            </Button>
          </>
        ) : (
          <>
            <Typography
              variant="h5"
              style={{
                marginBottom: "7%",
                marginTop: "3%",
                color: "#0085FF",
                fontWeight: "bold",
              }}
            >
              Reset Password
            </Typography>
            <TextField
              fullWidth
              label="Verification Code"
              variant="outlined"
              value={code}
              onChange={(e) => {
                console.log('Verification code input changed:', e.target.value);
                setCode(e.target.value);
              }}
              style={{ marginBottom: "25px" }}
            />
            <TextField
              fullWidth
              label="New Password"
              variant="outlined"
              type="password"
              value={newPassword}
              onChange={(e) => {
                console.log('New password input changed:', e.target.value);
                setNewPassword(e.target.value);
              }}
              style={{ marginBottom: "25px" }}
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              variant="outlined"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => {
                console.log('Confirm new password input changed:', e.target.value);
                setConfirmNewPassword(e.target.value);
              }}
              style={{ marginBottom: "25px" }}
            />
            <Button type="submit" variant="contained" color="primary" style={{ borderRadius: "20px" }}>
              Reset Password
            </Button>
          </>
        )}
      </form>
    </Grid>
  );
};

export default ForgotPassword;

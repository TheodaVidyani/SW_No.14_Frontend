import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Grid, Typography, TextField, Button } from "@mui/material";
import Lottie from "react-lottie";
import photo1 from "../images/HealthLabLogo.jpg";
import photo2 from "../images/BloodDraw.png";
import axios from 'axios';
import { useSetUser } from '../Admin/Admin_Component/UserContext';
import {jwtDecode} from 'jwt-decode';
import loadingAnimation from "../Components/Animation5.json"; // Replace with the actual path

function Login() {
  const navigate = useNavigate();
  const setUserContext = useSetUser(); // Correct usage of useSetUser
  const [data, setData] = useState({
    username: '',
    password: ''
  });

  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  axios.defaults.withCredentials = true;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const { username, password } = data;

    // Receive the response from the backend
    try {
      const response = await axios.post('http://localhost:3100/api/router_login/login', { username, password });
      console.log('Login response:', response.data);
      const userData = response.data; // Making an Object called userData
      console.log('User data:', userData); // After parsing/having response data, adding this console log to check if it is having all information

      if (userData.message !== 'Success') {
        console.log('Login: Error from backend:', userData.error);
        toast.error(userData.error);
        setError(userData.error);
        setIsSubmitting(false);
      } else {
        if(localStorage.getItem('myToken') !== null){
          localStorage.removeItem('myToken');
        }
        localStorage.setItem('myToken', userData.data);

        // Decode the JWT token to get the user information
        const decodedToken = jwtDecode(userData.data);
        const user = {
          id: decodedToken.id,
          role: decodedToken.role,
          username: decodedToken.username,
        };
         // Store token in local storage

        setUser(user);
        setUserContext(user);
        setData({ username: '', password: '' });

        const role = user.role;
        const userId = user.id;

        setTimeout(() => {
          switch (role) {
            case 'PATIENT':
              navigate(`/Patient/${userId}`);
            console.log('Navigation done');
              break;
            case 'ADMIN':
            console.log('Redirecting to Admin page');
              navigate(`/AdminInterface/${userId}`);
              break;
            case 'DOCTOR':
              navigate(`/Doctor/${userId}`);
              break;
            case 'LABASSISTANT':
              navigate(`/LabAssistant/${userId}`);
              break;
            case 'LABOPERATOR':
              navigate(`/LabOperator/${userId}`);
              break;
            default:
              navigate('/HomePage');
          }
        }, 3000); // Delay the navigation to show the animation
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh', padding: '20px' }}>
      {isSubmitting ? (
        <div className="loading-animation">
          <div className="loading-animation-wrapper">
            <Lottie options={defaultOptions} height={'100%'} width={'77%'} style={{ marginTop: '0%' }} />
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            borderRadius: "15px",
            padding: "40px",
            backgroundColor: "#D3E9FE",
            width: "90%",
            maxWidth: "1000px",
            boxShadow: "1px 5px 3px -3px rgba(0,0,0,0.44)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6} style={{ textAlign: 'center', marginBottom: '20px' }}>
              <img
                src={photo2}
                style={{ width: "100%", maxWidth: "450px", marginTop: "15px" }}
                alt="Blood Draw"
              />
            </Grid>

            <Grid item xs={12} md={6} style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: 'center', height: '100%', justifyContent: 'space-between' }}>
                <img
                  src={photo1}
                  style={{ width: "100%", maxWidth: "300px", marginTop: "10px", marginBottom: "20px" }}
                  alt="HealthLab Logo"
                />
                <Typography
                  variant="h4"
                  style={{
                    marginBottom: "20px",
                    color: "#0085FF",
                    fontWeight: "bold",
                  }}
                >
                  Welcome!
                </Typography>

                <Typography
                  variant="body1"
                  style={{
                    marginBottom: "40px",
                    fontFamily: "Inter",
                    fontWeight: "500",
                    fontSize: "12px",
                    lineHeight: "24px",
                    color: "#9C1C1C",
                  }}
                >
                  <Link to="/Signup" style={{ color: '#9C1C1C' }}>Doesn't have an account yet?</Link>
                </Typography>

                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  name="username"
                  value={data.username}
                  onChange={(e) => setData({ ...data, username: e.target.value })}
                  style={{ marginBottom: "20px" }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  name="password"
                  type="password"
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                  style={{ marginBottom: "20px" }}
                />

                {error && (
                  <Typography
                    variant="body1"
                    style={{
                      marginBottom: '20px',
                      color: '#9C1C1C',
                    }}
                  >
                    {error}
                  </Typography>
                )}

                <Typography
                  variant="body1"
                  style={{
                    marginBottom: "20px",
                    fontFamily: "Inter",
                    fontWeight: "500",
                    fontSize: "12px",
                    lineHeight: "24px",
                    color: "#9C1C1C",
                  }}
                >
                  <Link to="/forgetpassword" style={{ color: '#9C1C1C' }}>Forgot Password?</Link>
                </Typography>

                <Button type="submit" sx={{ variant: 'contained', color: '#FFFFFF', background: '#101754', width: '100%', height: '50px', marginBottom: '20px', '&:hover': { background: 'rgba(16, 23, 84, 0.7)' } }}>
                  Login
                </Button>

                {user && (
                  <Typography
                    variant="body1"
                    style={{
                      marginTop: '20px',
                      color: '#101754',
                    }}
                  >
                    Welcome, {user.username}!
                  </Typography>
                )}

              </div>
            </Grid>
          </Grid>
        </form>
      )}
    </Grid>
  );
}

export default Login;

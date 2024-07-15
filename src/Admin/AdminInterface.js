import React, { useEffect, useState } from 'react';
import Patienthead from '../Components/Patienthead';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import axios from 'axios';
import '../maincss/AdminInterface.css';
import AdminCards from './Admin_Component/Admin_cards';
import Lottie from "react-lottie";
import loadingAnimation from "../Components/Animation5.json"; // Replace with the actual path


function AdminInterface() {
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate a loading delay
        setTimeout(() => {
            setIsLoading(false);
        }, 4000);
    }, []);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        },
        speed: 1
    };

  const handleNavigate = useNavigate(); //Making an instance of useNavigate

// Ensure axios sends cookies with cross-origin requests
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:3100/api/AdminInterface')
      .then(res => {
        if (res.data === "success") {
          console.log("Successed"); // Or any other function or state update
        } else {
          console.log("User not authenticated as admin");
          handleNavigate('/');
        }
      })
      .catch(err => console.log(err));
      console.error("Error checking admin authentication:");
  }, [handleNavigate]);

  return (
    <div className={`patient-container ${isLoading ? "loading" : ""}`}>
            {isLoading ? (
                <div className="loading-animation">
                    <div className="loading-animation-wrapper">
                        <Lottie options={defaultOptions} height={'100%'} width={'77%'} style={{marginTop:'0%'}}/>
                    </div>
                </div>
            ) : (
              <div className="AdminInterface">
              <Patienthead />
              <Grid sx={{paddingTop:'13%', paddingBottom:'10%', alignitems:'center'}}>
                <AdminCards sx ={{ alignitems:'center'}}/>
              </Grid>      
              <Footer />
            </div>
            )}
        </div>
    
  );
}

export default AdminInterface;

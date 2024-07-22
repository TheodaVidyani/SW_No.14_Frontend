import React, { useEffect } from 'react';
import Patienthead from '../Components/Patienthead';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import axios from 'axios';
import '../maincss/AdminInterface.css';
import AdminCards from './Admin_Component/Admin_cards'

function AdminInterface() {
  const handleNavigate = useNavigate(); //Making an instance of useNavigate
axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('https://healthlabbackend.vercel.app/api/AdminInterface')
      .then(res => {
        if (res.data === "success") {
          console.log("Successed"); // Or any other function or state update
        } else {
          handleNavigate('/');
        }
      })
      .catch(err => console.log(err));
  }, [handleNavigate]);



  return (
    <div className="AdminInterface">
      <Patienthead />
      <Grid sx={{paddingTop:'13%', paddingBottom:'10%', alignitems:'center'}}>
        <AdminCards sx ={{ alignitems:'center'}}/>
      </Grid>      
      <Footer />
    </div>
  );
}

export default AdminInterface;
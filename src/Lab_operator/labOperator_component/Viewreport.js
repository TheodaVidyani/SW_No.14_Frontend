import React from 'react';
import Patienthead from '../../Components/Patienthead'; 
import Footer from '../../Components/Footer'; 
import { Grid } from '@mui/material';
import '../../maincss/Class.css';
import View from './View';
import BackToTop from '../../Patient/Selecttest_Components/Scroll';

function ViewTest() {
  return (
    <div className = "Class" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Patienthead />
      <Grid sx={{flex: 1, paddingTop:'12%', paddingBottom:'3%'}}>
        
        <View/>
        <BackToTop />
      </Grid>
      <Footer />
    </div>
  );
}

export default ViewTest;

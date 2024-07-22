import React, { useState } from 'react';
import ATestlist from './ATestlist';
import Patienthead from '../Components/Patienthead'; 
import Footer from '../Components/Footer'; 
import { Grid } from '@mui/material';
import '../maincss/Class.css';
import Testsearch from './Admin_Component/Testsearch';

function AViewTest() {
  const [rows, setRows] = useState([]);

  return (
    <div className="Class" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Patienthead />
      <Grid sx={{ flex: 1, paddingTop: '12%', paddingBottom: '3%' }}>
        <Testsearch rows={rows}/>
        <ATestlist setRows={setRows} />
      </Grid>
      <Footer />
    </div>
  );
}

export default AViewTest;

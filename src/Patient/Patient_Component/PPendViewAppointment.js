// ViewAppoinments.js
import React, { useState } from 'react';
import PAppointmentsearch from './PAppointmentsearch';
import Patienthead from '../../Components/Patienthead';
import Footer from '../../Components/Footer'; 
import { Grid } from '@mui/material';
import '../../maincss/Class.css';
import PPendAppoinmentlist from '../Patient_Component/PPendAppointmentlist';

function ViewTest() {
  const [rows, setRows] = useState([]);

  return (
    <div className="Class" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Patienthead />
      <Grid sx={{ flex: 1, paddingTop: '12%', paddingBottom: '3%' }}>
        <PAppointmentsearch rows={rows} />
        <PPendAppoinmentlist setRows={setRows} />
      </Grid>
      <Footer />
    </div>
  );
}

export default ViewTest;

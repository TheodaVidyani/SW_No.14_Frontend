import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function Dhome02() {
  const [reportId, setReportId] = useState('');
  const [appointmentId, setAppointmentId] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAppointmentIds();
  }, []);

  const fetchAppointmentIds = () => {
    axios.get('http://localhost:3100/api/appointmentId')
      .then(response => {
        setAppointmentId(response.data.appointmentId);
      })
      .catch(error => {
        console.error('Error fetching appointment IDs:', error);
      });
  };

  const handleClick = () => {
    if (reportId === '') {
      alert("Report ID cannot be null");
      console.log("id is" + jwtDecode(localStorage.getItem("myToken")).id); // Ensure jwtDecode is correctly imported if needed
    } else {
      window.location.href = `/Dapproval?reportId=${reportId}`;
    }
  };

  return (
    <Box sx={{ width: '79%', margin: 'auto', backgroundColor: '#D9D9D9', padding: '20px', borderRadius: '8px' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{ alignItems:'center'}}>
          <Grid item xs={7} sx={{ marginTop: '10px' }}>
            <FormControl fullWidth error={!!errors.reportId}>
              <InputLabel id="appointment-id-label">Report ID</InputLabel>
              <Select
                labelId="appointment-id-label"
                value={reportId}
                onChange={(e) => setReportId(e.target.value)}
              >
                {appointmentId.length > 0 ? (
                  appointmentId.map((appointmentId) => (
                    <MenuItem key={appointmentId} value={appointmentId}>
                      {appointmentId}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Appointment IDs available</MenuItem>
                )}
              </Select>
              {errors.id && (
                <Typography variant="caption" color="error">
                  {errors.id}
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={1} sx={{ marginTop: '10px', marginLeft: '200px' }}>
            <Button onClick={handleClick} sx={{ variant: 'contained', color: '#FFFFFF', background: '#101754', width: '250px', height: '50px' }}>
              View Report
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

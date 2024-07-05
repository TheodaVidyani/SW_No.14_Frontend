import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Box,Button,Grid,Typography,FormControl,InputLabel,Select,MenuItem} from "@mui/material";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function Dhome02() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [reportId, setReportId] = useState('');
  const [appointmentIds, setAppointmentIds] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAppointmentIds();
}, []);

const fetchAppointmentIds = () => {
    axios.get('http://localhost:3100/api/appointmentIds')
        .then(response => {
            console.log('Fetched appointment IDs:', response.data);
            setAppointmentIds(response.data.appointmentIds);
        })
        .catch(error => {
            console.error('Error fetching appointment IDs:', error);
        });
};

const handleClick = () => {
  if (!selectedDate || reportId === null) {
      alert("DatePicker and Report ID cannot be null");
      console.log("id is" + jwtDecode(localStorage.getItem("myToken")).id);
  } else {
      const date = selectedDate.format('YYYY-MM-DD');
      window.location.href = `/Dapproval?date=${date}&reportId=${reportId}`;
  }
};


  return (
    <Box sx={{ width: '80%', margin: 'auto', backgroundColor: '#D9D9D9', padding: '20px', borderRadius: '8px' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DemoItem>
                  <DatePicker
                    value={selectedDate}
                    onChange={date => setSelectedDate(date)}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={7} sx={{ marginTop: '10px' }}>
          <FormControl fullWidth error={!!errors.reportId}>
                    <InputLabel id="appointment-id-label">Report ID</InputLabel>
                    <Select
                        labelId="appointment-id-label"
                        value={reportId}
                        onChange={(e) => {
                            setReportId(e.target.value);
                        }}
                    >
                        {appointmentIds.map((appointmentId) => (
                            <MenuItem key={appointmentId} value={appointmentId}>
                                {appointmentId}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.id && (
                        <Typography variant="caption" color="error">
                            {errors.id}
                        </Typography>
                    )}
                </FormControl>
          </Grid>
          <Grid item xs={1} sx={{ marginTop: '10px' }}>
            <Button onClick={handleClick} sx={{ variant: 'contained', color: '#FFFFFF', background: '#101754', width: '250px', height: '50px' }}>
              View Report
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

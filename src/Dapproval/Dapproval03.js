import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import {
  Container,
  Paper,
  Grid,
  Box,
  Button,
} from "@mui/material";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const FixedContainer = () => {
  const query = useQuery();
  const [msg, setMsg] = useState('');
  const [rid, setRid] = useState(query.get('reportId') || '');
  const [nm, setNm] = useState([jwtDecode(localStorage.getItem("myToken")).username]);
  const [pid, setPid] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState(query.get('date') ? dayjs(query.get('date')) : null);

  useEffect(() => {
    if (rid) {
      fetchPatientId(rid);
    }
  }, [rid]);

  const fetchPatientId = async (reportId) => {
    try {
      const response = await axios.get(`http://localhost:3100/api/patientId/${reportId}`);
      setPid(response.data.patientId);
    } catch (error) {
      console.error('Error fetching patient ID:', error);
      setAlertMessage('Error fetching patient ID');
    }
  };

  

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (!rid.trim()) {
        throw new Error('Report ID cannot be empty');
      }

      const response = await axios.post('http://localhost:3100/api/recommendations', {
        date: selectedDate,
        id: rid,
        recommendation: msg,
        docname: jwtDecode(localStorage.getItem("myToken")).name,
        patientId: pid,
      });

      console.log('Response:', response);
      setAlertMessage('Submitted successfully!');
      setMsg('');
      setRid('');
      setSelectedDate(null);
      setNm('');
    } catch (error) {
      console.error('Error submitting recommendation:', error);
      if (error.response) {
        setAlertMessage(`Error: ${error.response.data.message || 'Failed to submit recommendation'}`);
      } else if (error.request) {
        setAlertMessage('Error: No response from the server');
      } else {
        setAlertMessage(`Error: ${error.message}`);
      }
    }
  };

  const handleApprove = async () => {
    try {
      const response = await axios.post('http://localhost:3100/api/approve', {
        reportId: rid,
        doctorName: jwtDecode(localStorage.getItem("myToken")).name,
        recommendation: msg,
        patientId: pid,
      });

      console.log('Approval Response:', response);
      
      setAlertMessage('Approval request sent successfully!');
    } catch (error) {
      console.error('Error approving report:', error);
      if (error.response) {
        setAlertMessage(`Error: ${error.response.data.message || 'Failed to send approval request'}`);
      } else if (error.request) {
        setAlertMessage('Error: No response from the server');
      } else {
        setAlertMessage(`Error: ${error.message}`);
      }
    }
  };
  const handleRecheck = async () => {
    try {
      const response = await axios.post('http://localhost:3100/api/recheck', {
        reportId: rid,
        doctorName: jwtDecode(localStorage.getItem("myToken")).name,
        recommendation: msg,
        patientId: pid,
      });

      
      
      setAlertMessage('Recheck request sent successfully!');
    } catch (error) {
      
      if (error.response) {
        setAlertMessage(`Error: ${error.response.data.message || 'Failed to send  request'}`);
      } else if (error.request) {
        setAlertMessage('Error: No response from the server');
      } else {
        setAlertMessage(`Error: ${error.message}`);
      }
    }
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3, backgroundColor: "#F0F0F0" }}>   
             <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            
            <Grid item xs={2}>
              <TextField
                value={rid}
                onChange={(e) => setRid(e.target.value)}
                id="outlined-required"
                label="Report Id"
                required
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                value={pid}
                onChange={(e) => setPid(e.target.value)}
                id="outlined-required"
                label="Patient Id"
                required
                 
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                value={jwtDecode(localStorage.getItem("myToken")).name}
                style={{width:'200px'}}
                id="outlined"
                label="Doctor name"
                required
                 disabled
              />
            </Grid>
            <Grid item xs={4} >
              <Button
                variant="contained"
                style={{ color: 'primary', width: '200px', height: '50px',  marginLeft:'300px' }}
                type="button"
                onClick={handleRecheck} 
              
              >
                Recommend to recheck
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      </Container>
      <br />
      <Container>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3, backgroundColor: "#F0F0F0" }}>   
        <h1>Recommendations</h1>
        <hr />
        <br />
        <div className="cont">
          <form onSubmit={submit}>
            <textarea
              name="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Need to..."
              cols="120"
              rows="10"
            ></textarea>
            <br />
            <Button
              type="submit"
              variant="contained"
              style={{ color: 'primary', width: '100px', height: '50px' }}
              onClick={handleApprove}
            >
              Approve
            </Button>
          </form>
        </div>
        <br />
        {alertMessage && <div>{alertMessage}</div>}
      </Paper>
      </Container>
    </React.Fragment>
  );
};

export default FixedContainer;

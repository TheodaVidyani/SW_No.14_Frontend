import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Grid, Paper, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow
} from '@mui/material';
import healthLabLogo from '../Labasisstence/LabasisstenceComponent/Labasisstenceimg/Health lab logo_.png'; // Replace with the path to your logo

function PReportUI({ id }) {
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3100/api/appoinments/${2}`)
      .then(response => {
        console.log(response.data);
        setAppointment(response.data);
      })
      .catch(error => console.error('Error fetching the appointment data:', error));
  }, [id]);

  if (!appointment) return <div>Loading...</div>;

  const regDate = appointment.regdate
    ? new Date(appointment.regdate.$date).toLocaleString()
    : 'N/A';
    

  const collectedDate = appointment.collectedDate
    ? new Date(appointment.collectedDate).toLocaleString()
    : 'N/A';

  const reportedDate = appointment.reportedDate
    ? new Date(appointment.reportedDate).toLocaleString()
    : 'N/A';

  return (
    <Container
      sx={{
        marginTop: "20px",
        display: "grid",
        gridTemplateColumns: "auto auto auto",
        gridTemplateRows: "auto",
        gridTemplateAreas: `
          "logo . Contact"
          "BD1 BD2 BD3"
          "Table Table Table"
          "end end end"
          "E n d"
          "printButton printButton printButton"
        `,
        columnGap: "30px",
        rowGap: "75px",
      }}
    >
      {/* First row */}
      <Grid item xs={3} sx={{ gridArea: "logo" }}>
        <Paper sx={{ width: "30%" }}>
          <img
            src={healthLabLogo}
            alt="logo"
            style={{ width: "100%", height: "auto" }}
          />
        </Paper>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{
          gridArea: "Contact",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Typography variant="body1">HealthLab</Typography>
        <Typography variant="body1">123 Medical St, Health City</Typography>
        <Typography variant="body1">Phone: (123) 456-7890</Typography>
      </Grid>

      {/* Second row */}
      <Grid item xs={3} sx={{ gridArea: "BD1" }}>
        <Typography variant="h6">{appointment.pname}</Typography>
        <Typography variant="body1" sx={{ fontSize: "14px" }}>
          Age: 26
          <br />
          Sex: Male
          <br />
          PID: {appointment.pid}
        </Typography>
      </Grid>
      <Grid item xs={3} sx={{ gridArea: "BD3" }}>
        <Typography variant="h6">{appointment.pname}</Typography>
        <Typography variant="body1" sx={{ fontSize: "14px" }}>
          Registered on: {regDate}
          <br />
          Collected on: {collectedDate}
          <br />
          Reported on: {reportedDate}
        </Typography>
      </Grid>

      {/* Third row */}
      <Grid
        item
        xs={6}
        sx={{ display: "grid", gridArea: "Table", width: "100%" }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Test</TableCell>
                <TableCell>Result</TableCell>
                <TableCell>Reference Value</TableCell>
                <TableCell>Unit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointment.selectTests && Array.isArray(appointment.selectTests) ? (
                appointment.selectTests.map((test) => (
                  console.log("here is "+test),
                  <TableRow key={test.testId}>
                    <TableCell>{test.testName}</TableCell>
                    <TableCell>{test.result || 'N/A'}</TableCell>
                    <TableCell>{test.min ? `${test.min} - ${test.max}` : 'N/A'}</TableCell>
                    <TableCell>{test.unit || 'N/A'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>No test data available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      {/* End */}
      <Grid item sx={{ display: "grid", gridArea: "end", placeSelf: "center" }}>
        <Typography variant="body1">
          ----------------------------- **End of report** -----------------------------
        </Typography>
      </Grid>

      <Grid item sx={{ display: "grid", gridArea: "E" }}>
        <Typography variant="body1">
          ----------------------
          <br />
          Medical Lab Technician
        </Typography>
      </Grid>
      <Grid item sx={{ display: "grid", gridArea: "d" }}>
        <Typography variant="body1">
          ----------------------
          <br />
          Dr. Rajitha Bandara
        </Typography>
      </Grid>

      {/*<Grid item sx={{ display: "grid", gridArea: "printButton", placeSelf: "center" }}>
        <Button variant="contained" color="primary" onClick={() => window.print()}>
          Print
        </Button>
      </Grid>*/}
    </Container>
  );
}

export default PReportUI;

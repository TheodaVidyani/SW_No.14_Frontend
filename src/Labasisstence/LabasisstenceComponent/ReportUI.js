import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Paper,
  Container,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
} from "@mui/material";
import healthLabLogo from "./Labasisstenceimg/Health lab logo_.png";
import { useLocation } from "react-router-dom";

const ReportUI = () => {
  const location = useLocation();
  const [testsDB, setTestsDB] = useState([]);//Store test data
  const [userData, setUserData] = useState([]);//Store user data
  const [results, setResults] = useState([]);//Store test results data
  const [open, setOpen] = useState(false); 
  const [selectedTest, setSelectedTest] = useState(null); 
  const [editedResult, setEditedResult] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [showAlert, setShowAlert] = useState(false); // store alert status

  const record = location.state.record;
  const tests = record.selectTests; // store all test type on appointment

  // Fetch test data from the server
  useEffect(() => {
    async function getTestData() {
      const response = await fetch(`http://localhost:3100/tests`);
      if (!response.ok) {
        window.alert(`An error occurred: ${response.statusText}`);
        return;
      }
      const testData = await response.json();
      setTestsDB(testData.response);
    }
    getTestData();
  }, []);

  // Fetch user data from the DB based on the patient ID
  useEffect(() => {
    async function getUserDataByID() {
      const response = await fetch(`http://localhost:3100/api/getuser/${record.pid}`);
      if (!response.ok) {
        window.alert(`An error occurred in user data section : ${response.statusText}`);
        return;
      }
      const user = await response.json();
      setUserData(user.user);
    }
    getUserDataByID();
  }, [record.pid]);

  // Fetch test results from the DB
  useEffect(() => {
    async function getResult() {
      const response = await fetch(`http://localhost:3100/api/testresult`);
      if (!response.ok) {
        window.alert(`An error occurred: ${response.statusText}`);
        return;
      }
      const resultsData = await response.json();
      setResults(resultsData.result);
    }
    getResult();
  }, [record.pid, updateStatus]);

  // Calculate the age of the patient based on the national ID
  const calculateAge = () => {
    const dob = new Date(userData.dob);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge();

  // Combine test data with test results
  const tableData = tests.map((test) => {
    const matchedResult = results.find((result) => result.testid === test._id);
    const matchedTestDB = testsDB.find((dbTest) => dbTest.id === test.testId);
    return {
      testId: test._id,
      result: matchedResult ? matchedResult.testresults : "no data",
      testName: test.testName,
      min: matchedTestDB ? matchedTestDB.min : "no data",
      max: matchedTestDB ? matchedTestDB.max : "no data",
      unit: matchedTestDB ? matchedTestDB.unit : "no data",
    };
  });
// store all report details in a object
  const reportDetails = {
    patientName: record.pname,
    patientEmail: userData.email,
    PatientAge: age,
    PatientSex: userData.gender,
    PatientID: record._id,
    RegisteredOn: record.regdate.split("T")[0],
    CollectedOn: "02.31pm 02 December",
    ReportedOn: "02.31 December 2022",
    LabTechnician: "Medical Lab Technician",
    Doctor: "Dr. Rajitha Bandara",
    tableData: tableData,
  };

  const sendEmail = async () => {
    try {
      const response = await fetch('http://localhost:3100/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: reportDetails,
          type: 'report',
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      setShowAlert(true); // Show alert when email is sent successfully
      setTimeout(() => {
        setShowAlert(false); // Close alert after 3 seconds
      }, 3000);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEditClick = (test) => {
    setSelectedTest(test);
    setEditedResult(test.result);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTest(null);
  };

  const handleSave = async () => {
    try {
      // Validate the edited result
      if (!/^\d+(\.\d+)?$/.test(editedResult)) {
        alert('Please enter a valid number');
        return;
      }
      
      // Validate the range of the edited result
      const min = 300;
      const max = 20000;
      if (min !== 'no data' && max !== 'no data') {
        const result = parseFloat(editedResult);
        if (result < parseFloat(min) || result > parseFloat(max)) {
          alert('Please enter the valid range results ');
          return;
        }
      }

      const response = await axios.put('http://localhost:3100/api/updatdata', {
        updatedData: selectedTest,
      });
      alert('Data updated successfully');
      setUpdateStatus(response.data);
      setOpen(false);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    setSelectedTest(prevState => ({ ...prevState, result: editedResult }));
  }, [editedResult]);

  useEffect(() => {
    console.log(selectedTest);
  }, [selectedTest]);

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
          "E n d "
          "I . R"
        `,
        columnGap: "30px",
        rowGap: "75px",
      }}
    >
      <style>
        {`
          @media print {
            .no-print {
              display: none !important;
            }
          }
        `}
      </style>
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
        <Typography variant="body1"></Typography>
        <Typography variant="body1"></Typography>
      </Grid>
      <Grid item xs={6} sx={{ gridArea: "BD1" }}>
        <Typography variant="p" sx={{ fontSize: "16px" }}>
          {record.pname}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "14px" }}>
          Age: {reportDetails.PatientAge}
          <br />
          Sex: {reportDetails.PatientSex}
          <br />
          PID: {record._id}
        </Typography>
      </Grid>
      <Grid item xs={6} sx={{ gridArea: "BD3" }}>
        <Typography variant="p" sx={{ fontSize: "16px" }}>
          {record.username}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "14px" }}>
          Registered on: {record.regdate.split("T")[0]}
          <br />
          Collected on: 02.31pm 02 December
          <br />
          Reported on: 02.31 December 2022
        </Typography>
      </Grid>
      <Grid item xs={6} sx={{ display: "grid", gridArea: "Table", width: "100%" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Test</TableCell>
                <TableCell>Result</TableCell>
                <TableCell>Reference Value</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell className="no-print">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.testId}>
                  <TableCell>{row.testName}</TableCell>
                  <TableCell>{row.result}</TableCell>
                  <TableCell>{row.min} - {row.max}</TableCell>
                  <TableCell>{row.unit}</TableCell>
                  <TableCell className="no-print">
                    <Button variant="outlined" onClick={() => handleEditClick(row)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={6} sx={{ display: "grid", gridArea: "end", placeSelf: "center" }}>
        <Typography variant="p">
          ----------------------------- **End of report** -----------------------------
        </Typography>
      </Grid>
      <Grid item xs={6} sx={{ display: "grid", gridArea: "E" }}>
        <Typography variant="p">
          ----------------------
          <br />
          Medical Lab Technician
        </Typography>
      </Grid>
      <Grid item xs={6} sx={{ display: "grid", gridArea: "d" }}>
        <Typography variant="p">
          ----------------------
          <br />
          Dr. Rajitha Bandara
        </Typography>
      </Grid>

      <Grid item xs={12} sx={{ display: "grid", gridArea: "I", placeSelf: "left", margin: "20px", width: "100%" }} className="no-print">
        <Button variant="outlined" width=" 50%" color="primary" onClick={() => window.print()}>
          Print
        </Button>
      </Grid>

      <Grid item xs={12} sx={{ display: "grid", gridArea: "R", placeSelf: "right", margin: "20px", width: "100%" }} className="no-print">
        <Button variant="outlined" color="secondary" width=" 50%" onClick={sendEmail}>
          Send Email
        </Button>
      </Grid>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Test Result</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{selectedTest && selectedTest.testName}</Typography>
          <TextField
            autoFocus
            margin="dense"
            id="result"
            label="Result"
            fullWidth
            value={editedResult}
            onChange={(e) => setEditedResult(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Success Alert */}
      {showAlert && (
        <Alert
          sx={{
            position: "absolute",
            margin: "30px",
            marginTop: "150px",
            width: "300px",
            height: "50px",
            top: 0,
            left: "10%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            backgroundColor: "#91DDCF",
            opacity: 0.8
          }}
          severity="success"
          onClose={() => setShowAlert(false)}
        >
          Email sent successfully
        </Alert>
      )}
    </Container>
  );
};

export default ReportUI;

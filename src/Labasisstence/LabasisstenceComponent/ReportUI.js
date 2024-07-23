// export default ReportUI;
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
  Snackbar,
  Alert,
} from "@mui/material";
import healthLabLogo from "./Labasisstenceimg/Health lab logo_.png";
import { useLocation } from "react-router-dom";

const ReportUI = () => {
  const location = useLocation();
  const [testsDB, setTestsDB] = useState([]); //Store test data
  const [userData, setUserData] = useState([]); //Store user data
  const [results, setResults] = useState([]); //Store test results 
  const [recomandation, setRecomandation] = useState([]); //Store appointment recomandation
  const [open, setOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [editedResult, setEditedResult] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [showAlert, setShowAlert] = useState(false);

  const record = location.state.record;
  const tests = record.selectTests; // store all test type on appointment

  // Fetch test data from the server
  useEffect(() => {
    async function getTestData() {
      const response = await fetch(`https://helthlabback.vercel.app/tests`);
      if (!response.ok) {
        setAlertMessage(`An error occurred: ${response.statusText}`);
        setAlertType("error");
        setShowAlert(true);
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
      const response = await fetch(`https://helthlabback.vercel.app/api/getuser/${record.pid}`);
      if (!response.ok) {
        setAlertMessage(`An error occurred in user data section: ${response.statusText}`);
        setAlertType("error");
        setShowAlert(true);
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
      const response = await fetch(`https://helthlabback.vercel.app/api/testresult`);
      if (!response.ok) {
        setAlertMessage(`An error occurred: ${response.statusText}`);
        setAlertType("error");
        setShowAlert(true);
        return;
      }
      const resultsData = await response.json();
      setResults(resultsData.result);
    }
    getResult();
  }, [record.pid]);


  // fetch recommandatio data from the DB

  useEffect(() => {
    async function getResult() {
      const response = await fetch(`https://helthlabback.vercel.app/api/getrecomandationbyid/${record.id}`);
      if (!response.ok) {
        setAlertMessage(`An error occurred: ${response.statusText}`);
        setAlertType("error");
        setShowAlert(true);
        return;
      }
      const resultsData = await response.json();
      setRecomandation(resultsData.result);
    }
    getResult();
  }, [record.pid]);


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

  // Store all report details in an object
  const reportDetails = {
    patientName: record.pname,
    patientEmail: userData.email,
    PatientAge: age,
    PatientSex: userData.gender,
    PatientID: record._id,
    RegisteredOn: record.regdate.split("T")[0],
    ReportedOn: recomandation?.date?.split("T")[0] || "",
    Doctor: recomandation.docname,
    tableData: tableData,
  };

  const sendEmail = async () => {
    try {
      const response = await fetch('https://helthlabback.vercel.app/api/send', {
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
      setAlertMessage('Email sent successfully');
      setAlertType('success');
      setShowAlert(true);
    } catch (error) {
      setAlertMessage(error.message);
      setAlertType('error');
      setShowAlert(true);
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
        setAlertMessage('Please enter a valid number');
        setAlertType('error');
        setShowAlert(true);
        return;
      }

      // Validate the range of the edited result
      const min = selectedTest.min;
      const max = selectedTest.max;
      if (min !== 'no data' && max !== 'no data') {
        const result = parseFloat(editedResult);
        if (result < parseFloat(min) || result > parseFloat(max)) {
          setAlertMessage('Please enter the valid range results');
          setAlertType('warning');
          setShowAlert(true);
          return;
        }
      }

      const response = await axios.put('https://helthlabback.vercel.app/api/updatdata', {
        updatedData: selectedTest,
      });
      setAlertMessage('Data updated successfully');
      setAlertType('success');
      setShowAlert(true);
      setOpen(false);
    } catch (error) {
      setAlertMessage(error.message);
      setAlertType('error');
      setShowAlert(true);
    }
  };

  useEffect(() => {
    setSelectedTest((prevState) => ({ ...prevState, result: editedResult }));
  }, [editedResult]);

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
          Registered On: {reportDetails.RegisteredOn}
          <br />
          Reported On: {reportDetails.ReportedOn }
        </Typography>
      </Grid>
    
      <Grid item xs={12} sx={{ gridArea: "Table", width: "100%" }}>
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
         
Approved By: <strong>Dr.{reportDetails.Doctor}</strong> 
        </Typography>
      </Grid>
      
      <Grid item xs={12} sx={{ display: "grid", gridArea: "I", placeSelf: "left", margin: "20px", width: "100%" }} className="no-print">
        <Button variant="outlined" width="50%" color="primary" onClick={() => window.print()}>
          Print
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ display: "grid", gridArea: "R", placeSelf: "right", margin: "20px", width: "100%" }} className="no-print">
        <Button variant="outlined" color="secondary" width="50%" onClick={sendEmail}>
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
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity={alertType}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ReportUI;

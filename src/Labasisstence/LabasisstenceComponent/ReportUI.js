import React, { useEffect,useState } from "react";
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
} from "@mui/material";
import healthLabLogo from "./Labasisstenceimg/Health lab logo_.png";
import { useLocation } from "react-router-dom";

const ReportUI = () => {
  const location = useLocation();

  //all test data 
  const [testsDB, setTestsDB] = useState([]);
  // appointment data (patiant)
  const record = location.state.record;
  const PID =record.pid;
  const appointmentID = record.id;
// patient registerd tests
  const tests = record.selectTests;

  






  // fetch data rest result from the test result database

// useEffect(() => {async function getReport() {
// const response = await fetch(`http://localhost:3100/labreport/testResults:${record.id}`);
// if (!response.ok) {
//   const message = `An error occurred: ${response.statusText}`;
//   window.alert(message);
//   return;
// }
// const records = await response.json();
// var record = records.report;
// }
// getReport();
// return;
// },[]);

// fetch data from Test database

useEffect(() => {async function getTestData() {
  const response = await fetch(`http://localhost:3100/tests`);
  if (!response.ok) {
    const message = `An error occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }
  const testData = await response.json();
  setTestsDB(testData.response);
  }
  getTestData();
  return;
  },[]);




  // Test resul page object 

  // Corrected version
const tableData = tests.map((test) => ({
  testId: test.testId,
  testName: test.testName,
  min: testsDB.find((dbTest) => dbTest.id === test.testId)?.min || "no data",
  max: testsDB.find((dbTest) => dbTest.id === test.testId)?.max || "no data",
  unit: testsDB.find((dbTest) => dbTest.id === test.testId)?.unit || "no data",
}));







  const data = [
    { id: 1, col1: "Data 1", col2: "Data 2", col3: "Data 3", col4: "Data 4" },
    { id: 2, col1: "Data 5", col2: "Data 6", col3: "Data 7", col4: "Data 8" },
    {
      id: 3,
      col1: "Data 9",
      col2: "Data 10",
      col3: "Data 11",
      col4: "Data 12",
    },
  ];

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
    `,
        columnGap: "30px",
        rowGap: "75px",
      }}
    >
      {/* First row */}
      {/* Image grid */}
      <Grid item xs={3} sx={{ gridArea: "logo" }}>
        <Paper sx={{ width: "30%" }}>
          <img
            src={healthLabLogo}
            alt="logo"
            style={{ width: "100%", height: "auto" }}
          />
        </Paper>
      </Grid>
      {/* Text grid */}
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

      {/* Second row */}
      {/* Bio data */}
      {/* First coloum */}
      <Grid item xs={3} sx={{ gridArea: "BD1" }}>
        <Typography variant="p" sx={{ fontSize: "16px" }}>
          {record.pname}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "14px" }}>
          Age:26
          <br />
          Sex:Mail
          <br />
          PID:{record._id}
        </Typography>
      </Grid>
      {/* Second coloum */}
      {/* Third coloum */}
      <Grid item xs={3} sx={{ gridArea: "BD3" }}>
        <Typography variant="p" sx={{ fontSize: "16px" }}>
          {record.username}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "14px" }}>
          Registered on: 02.31 pm December 2022
          <br />
          Collected on: 02.31pm 02 December
          <br />
          Reported on: 02.31 December 2022
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
            {/* Table head */}
            <TableHead>
              <TableRow>
                <TableCell>Test</TableCell>
                <TableCell>Result</TableCell>
                <TableCell>Reference Value</TableCell>
                <TableCell>unit</TableCell>
              </TableRow>
            </TableHead>
            {/* Table body */}
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.testId}>
                  <TableCell>{row.testName}</TableCell>
                  <TableCell>{row.result}</TableCell>
                  <TableCell>{row.min} - {row.max}</TableCell>
                  <TableCell>{row.unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      {/* End  */}
      <Grid item sx={{ display: "grid", gridArea: "end", placeSelf: "center" }}>
        <Typography variant="p">
          ----------------------------- **End of report**
          -----------------------------
        </Typography>
      </Grid>

      <Grid item sx={{ display: "grid", gridArea: "E" }}>
        <Typography variant="p">
          ----------------------
          <br />
          Medical Lab Technetion
        </Typography>
      </Grid>
      <Grid item sx={{ display: "grid", gridArea: "d" }}>
        <Typography variant="p">
          ----------------------
          <br />
          Dr.Rajitha Bandara
        </Typography>
      </Grid>


      <Grid item sx={{ display: "grid", gridArea: "printButton", placeSelf: "center" }}>
        <Button variant="contained" color="primary" onClick={() => window.print()}>
          Print
        </Button>
      </Grid>
    </Container>
  );
};

export default ReportUI;

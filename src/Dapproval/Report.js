import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import healthLabLogo from "../Labasisstence/LabasisstenceComponent/Labasisstenceimg/Health lab logo_.png";
import { jwtDecode } from "jwt-decode";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Invoice = () => {
  const [record, setRecord] = useState(null);
  const [testDB, setTestsDB] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [total, setTotal] = useState("0");

  const query = useQuery();
  const reportId = query.get("reportId");

  useEffect(() => {
    async function getTestData() {
      try {
        const response = await fetch(`https://healthlabback-git-vercelback-bytebuzzers-projects.vercel.app/tests`);
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        const testData = await response.json();
        setTestsDB(testData.response);
      } catch (error) {
        window.alert(error.message);
      }
    }
    getTestData();
  }, []);

  useEffect(() => {
    async function getRecords() {
      try {
        const response = await fetch(`https://healthlabback-git-vercelback-bytebuzzers-projects.vercel.app/api/appoinments/${reportId}`);
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        const records = await response.json();
        setRecord(records.response);
      } catch (error) {
        window.alert(error.message);
      }
    }
    getRecords();
  }, [reportId]);

  useEffect(() => {
    async function getResults() {
      try {
        const response = await fetch(`https://healthlabback-git-vercelback-bytebuzzers-projects.vercel.app/api/getResults`);
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        const results = await response.json();
        setTestResults(results.response); // Assuming the API response has a 'response' field
      } catch (error) {
        window.alert(error.message);
      }
    }
    getResults();
  }, [reportId]);

  if (!record || !testDB.length) {
    return <Typography>Loading...</Typography>;
  }

  const inVoiceData = record.selectTests.map((test) => {
    const dbTest = testDB.find((dbTest) => dbTest.id === test.testId) || {};
    const result = testResults.find(
      (res) => res.testtype === test.testName && res.pid === record.pid
    ) || {};

    return {
      testID: test.testId,
      testName: test.testName,
      min: dbTest.min || "0",
      max: dbTest.max || "infinity",
      unit: dbTest.unit || "no data",
      result: result.testresults || "no data",
    };
  });

  const invoiceDetails = {
    appointmentId: record.id || "INV-001",
    date: record.regdate.split("T")[0],
    dueDate: record.dueDate || "2024-07-24",
    companyAddress: record.companyAddress || "1234 Main St, City, State, ZIP lab address",
    customerName: record.pname || "John Doe",
    customerAddress: record.customerAddress || "5678 Second St, City, State, ZIP customer address",
    items: inVoiceData || [
      { id: 1, description: "Item 1", quantity: 2, price: 50 },
      { id: 2, description: "Item 2", quantity: 1, price: 100 },
      { id: 3, description: "Item 3", quantity: 3, price: 30 },
    ],
  };

  const columns = [
    { field: "Test", headerName: "Test", width: 70 },
    { field: "Default Range", headerName: "Default Range", width: 150 },
    { field: "Result", headerName: "Result", width: 150 },
    { field: "Unit", headerName: "Unit", width: 100 },
  ];

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3, backgroundColor: "#F0F0F0" }}>
        <Typography variant="h4" align="center" gutterBottom>
          LAB REPORT
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper sx={{ width: "30%" }}>
              <img
                src={healthLabLogo}
                alt="logo"
                style={{ width: "100%", height: "auto" }}
              />
            </Paper>
            <Typography>{invoiceDetails.companyAddress}</Typography>
          </Grid>
          <Grid item xs={6} align="right">
            <Typography variant="h6">{invoiceDetails.customerName}</Typography>
            <Typography>{invoiceDetails.customerAddress}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} marginTop={2}>
          <Grid item xs={6}>
            <Typography>
              <strong>Appointment ID:</strong> {invoiceDetails.appointmentId}
            </Typography>
            <Typography>
              <strong>Date:</strong> {invoiceDetails.date}
            </Typography>
          </Grid>
          <Grid item xs={6} align="right">
            <Typography>
              <strong>Due Date:</strong> {invoiceDetails.dueDate}
            </Typography>
          </Grid>
        </Grid>
        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.field}>
                    <strong>{column.headerName}</strong>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {inVoiceData.map((item) => (
                <TableRow key={item.testID}>
                  <TableCell>{item.testName}</TableCell>
                  <TableCell>{`${item.min}` + " - " + `${item.max}`}</TableCell>
                  <TableCell>{item.result || ((item.max + item.min) / 2) - (item.max - item.min) / 4}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} marginTop={3}>
          <Grid
            item
            sx={{
              display: "grid",
              gridArea: "printButton",
              placeSelf: "center",
            }}
          >
            {/* <Button
              variant="contained"
              color="primary"
              onClick={() => window.print()}
            >
              Print
            </Button> */}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Invoice;

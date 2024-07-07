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
import healthLabLogo from "../../images/HealthLabLogo.jpg";
import { jwtDecode } from "jwt-decode";

const Invoice = ({ id }) => {
  const [record, setRecord] = useState(null);
  const [testDB, setTestsDB] = useState(null);
  const [patient, setPatient] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    async function getUserDetails() {
      if (!patient) {
        console.error("Patient ID is null or undefined");
        return;
      }
      try {
        const response = await fetch(`http://localhost:3100/api/getuser/${patient}`);
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        const userDetails = await response.json();
        setUserDetails(userDetails);
        console.log("User details fetched successfully:", userDetails);
      } catch (error) {
        console.error("Failed to fetch user details:", error.message);
        window.alert(error.message);
      }
    }
    getUserDetails();
  }, [patient]);

  useEffect(() => {
    async function getTestData() {
      try {
        const response = await fetch(`http://localhost:3100/tests`);
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        const testData = await response.json();
        setTestsDB(testData.response);
        console.log("Test data fetched successfully:", testData.response);
      } catch (error) {
        console.error("Failed to fetch test data:", error.message);
        window.alert(error.message);
      }
    }
    getTestData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("myToken");
    if (token) {
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);
    } else {
      console.error("Token not found in localStorage");
    }

    async function getRecords() {
      try {
        const response = await fetch(`http://localhost:3100/api/appoinments/${id}`);
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        const records = await response.json();
        setRecord(records.response);
        console.log("Records fetched successfully:", records.response);
      } catch (error) {
        console.error("Failed to fetch records:", error.message);
        window.alert(error.message);
      }
    }
    getRecords();
  }, [id]);

  useEffect(() => {
    if (record) {
      setPatient(record.pid);
    }
  }, [record]);

  if (!record || !testDB) {
    return <Typography>Loading...</Typography>;
  }

  const inVoiceData = record.selectTests.map((test) => ({
    testID: test.testId,
    testName: test.testName,
    price:
      testDB.find((dbTest) => dbTest.id === test.testId)?.price || "no data",
    description:
      testDB.find((dbTest) => dbTest.id === test.testId)?.description ||
      "no data",
  }));

  const invoiceTotalAmount = inVoiceData.reduce(
    (acc, item) => acc + (item.price || 0),
    0
  );

  const invoiceDetails = {
    patientid: record.pid || "P-001",
    appointmentId: record.id || "INV-001",
    date: (new Date(record.regdate || new Date())).toISOString().split("T")[0],
    dueDate: record.dueDate || "2024-07-24",
    companyAddress:
      record.companyAddress || "1234 Main St, City, State, ZIP lab address",
    customerName: record.pname || "John Doe",
    customerAddress:
    userDetails?.user.address ||
      "5678 Second St, City, State, ZIP customer address",
    items: inVoiceData || [
      { id: 1, description: "Item 1", quantity: 2, price: 50 },
      { id: 2, description: "Item 2", quantity: 1, price: 100 },
      { id: 3, description: "Item 3", quantity: 3, price: 30 },
    ],
    email: userDetails?.user.email || "No email",
    phonenumber: userDetails?.user.phonenumber || "No phone number",
  };

  const columns = [
    { field: "Test", headerName: "Test", width: 70 },
    { field: "description", headerName: "Description", width: 150 },
    { field: "quantity", headerName: "", width: 100 },
    { field: "price", headerName: "Price", width: 100 },
  ];

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Invoice
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
            <Typography>
              <strong>Phone:</strong> {invoiceDetails.phonenumber}
            </Typography>
          </Grid>
          <Grid item xs={6} align="right">
            <Typography>
              <strong>Due Date:</strong> {invoiceDetails.dueDate}
            </Typography>
            <Typography>
              <strong>Email:</strong> {invoiceDetails.email}
            </Typography>
          </Grid>
        </Grid>
        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.field}>{column.headerName}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {inVoiceData.map((item) => (
                <TableRow key={item.testID}>
                  <TableCell>{item.testName}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{}</TableCell>
                  <TableCell>{item.price}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right">
                  <strong>Total:</strong>
                </TableCell>
                <TableCell>{invoiceTotalAmount}</TableCell>
              </TableRow>
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.print()}
            >
              Print
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Invoice;



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
import healthLabLogo from "../../LabasisstenceComponent/Labasisstenceimg/Health lab logo_.png";

const Invoice = ({ id }) => {
  const [record, setRecord] = useState(null);
  const [testDB, setTestsDB] = useState(null);

  useEffect(() => {
    async function getTestData() {
      try {
        const response = await fetch(`http://localhost:3100/tests`);
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
        const response = await fetch(
          `http://localhost:3100/api/appoinments/3`
        );
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
  }, [id]);

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
    appointmentId: record.id || "INV-001",
    date: new Date().toISOString().split("T")[0],
    dueDate: record.dueDate || "2024-07-24",
    companyAddress:
      record.companyAddress || "1234 Main St, City, State, ZIP lab address",
    customerName: record.pname || "John Doe",
    total: invoiceTotalAmount,
    customerAddress:
      record.customerAddress ||
      "5678 Second St, City, State, ZIP customer address",
    items: inVoiceData || [
      { id: 1, description: "Item 1", quantity: 2, price: 50 },
      { id: 2, description: "Item 2", quantity: 1, price: 100 },
      { id: 3, description: "Item 3", quantity: 3, price: 30 },
    ],
  };

  const columns = [
    { field: "Test", headerName: "Test", width: 120 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "price", headerName: "Price ($)", width: 100 },
  ];

  const sendEmail = async () => {
    try {
      const response = await fetch("http://localhost:3100/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: invoiceDetails,
          type: "invoice",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to send email");
      }
      alert("Email sent successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container>
      <style>
        {`
          @media print {
            .no-print {
              display: none !important;
            }
          }
        `}
      </style>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Invoice
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper sx={{ width: "80%", padding: 2 }}>
              <img
                src={healthLabLogo}
                alt="logo"
                style={{ width: "100%", height: "auto" }}
              />
            </Paper>
            <Typography sx={{ marginTop: 2 }}>
              <strong>Company Address:</strong> {invoiceDetails.companyAddress}
            </Typography>
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
                  <TableCell key={column.field}>{column.headerName}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {inVoiceData.map((item) => (
                <TableRow key={item.testID}>
                  <TableCell>{item.testName}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>1</TableCell>
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
          <Grid item xs={6} className="no-print">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => window.print()}
            >
              Print
            </Button>
          </Grid>
          <Grid item xs={6} align="right" className="no-print">
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={sendEmail}
            >
              Send Email
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Invoice;

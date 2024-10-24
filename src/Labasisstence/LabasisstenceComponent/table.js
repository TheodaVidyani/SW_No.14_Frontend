

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Grid,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Record = (props) => {
  const navigate = useNavigate();
  const navigateInvoice = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [ResultStatus, setResultStatus] = useState("Pending");

  const HandleGenerate = (record) => {
    if (record.state === "result_add" || record.state === "Doctor_approved") {
      navigate("/ReportUI", { state: { record } });
    } else {
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  const HandleInvoice = (record) => {
    navigateInvoice("/Invoice", { state: { record } });
  };

  useEffect(() => {
    if (
      props.record.state === "result_add" ||
      props.record.state === "Doctor_approved"
    ) {
      setResultStatus("Result Updated");
    } else {
      setResultStatus("Pending");
    }
  }, [props.record.state]);

  return (
    <TableRow>
      <TableCell>{props.record.id}</TableCell>
      <TableCell>{props.record.pname}</TableCell>
      <TableCell>{props.record.pid}</TableCell>
      <TableCell
        style={{ color: ResultStatus === "Result Updated" ? "green" : "red" }}
      >
        {ResultStatus}
      </TableCell>
      <TableCell>
        <Button
          style={{
            color: ResultStatus === "Result Updated" ? "green" : "red",
            opacity: ResultStatus === "Result Updated" ? 1 : 0.4,
          }}
          variant="outlined"
          color="primary"
          onClick={() => HandleGenerate(props.record)}
        >
          Report
        </Button>
      </TableCell>
      <TableCell>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => HandleInvoice(props.record)}
        >
          Invoice
        </Button>
      </TableCell>
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Report is not ready yet
        </Alert>
      </Snackbar>
    </TableRow>
  );
};

export default function RecordeList() {
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`https://healthlabback-git-vercelback-bytebuzzers-projects.vercel.app/api/appointments`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message, "Data not fetching");
        return;
      }
      const recordsObject = await response.json();
      const records = recordsObject.response;
      setRecords(records);
    }
    getRecords();
  }, []);

  const RenderRecordList = () => {
    const filteredRecords = records.filter(
      (record) =>
        record.pname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.id.toString().includes(searchQuery)
    );
    return filteredRecords.map((record) => (
      <Record key={record.id} record={record} />
    ));
  };

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <TextField
            label="Search by Name or ID"
            variant="outlined"
            fullWidth
            size="medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginBottom: "20px", marginTop: "100px" }}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Paper elevation={3}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ReportID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Patient ID</TableCell>
                    <TableCell>State</TableCell>
                    <TableCell>Report</TableCell>
                    <TableCell>Invoice</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{RenderRecordList()}</TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

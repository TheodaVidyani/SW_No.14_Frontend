
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Grid, Paper } from '@mui/material';
import { useNavigate } from "react-router-dom";

const Record = (props) => {
  const navigate = useNavigate();
  const navigateInvoice=useNavigate();
  
  const HandleGenerate = (record) => {
    navigate('/ReportUI', { state: { record } });
  };

  const HandleInvoice = (record) => {
    navigateInvoice('/Invoice', { state: { record } });
  };

  return (
    <TableRow>
      <TableCell>{props.record.id}</TableCell>
      <TableCell>{props.record.pname}</TableCell>
      <TableCell>{props.record.pid}</TableCell>
      <TableCell>
        <Button variant="outlined" color="primary" onClick={() => HandleGenerate(props.record)}>
          Report
        </Button>
        </TableCell>
        <TableCell>
        <Button variant="outlined" color="primary" onClick={() => HandleInvoice(props.record)}>
          invoice
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default function RecordeList() {
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:3100/api/appointments`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      setRecords(records.response);
    }
    getRecords();
  }, [records.length]);

  const RenderRecordList = () => {
    const filteredRecords = records.filter(record =>
      record.pname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.id.toString().includes(searchQuery)
    );

    return filteredRecords.map((record) => (
      <Record key={record.id} record={record} />
    ));
  };

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <TextField
            label="Search by Name or ID"
            variant="outlined"
            fullWidth
            size="medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginBottom: '20px' , marginTop: '100px'}}
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
                    <TableCell>Report</TableCell>
                    <TableCell>Invoice</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {RenderRecordList()}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}



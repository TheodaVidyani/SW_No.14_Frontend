import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper,TablePagination,Box,Typography} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const columns = [
    { id: 'patient_id', label: 'Patient ID', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'appointment_id', label: 'Appointment Id', minWidth: 100 },
    { id: 'test', label: 'Test', minWidth: 100 },
    { id: 'test_result', label: 'Test Result', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 100, align: 'center' },
  ];
const TestresulltTable = ({ rows, selectedResult, deleteResults }) => {
 
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    return (
        <Paper sx={{ width: '98%', overflow: 'hidden', margin: 'auto', textAlign: 'center', marginTop: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2, padding: 4, marginTop: 4 }}>
        <Typography variant="h5">Test Results</Typography>
      </Box>
      <TableContainer sx={{ maxHeight: 420, minHeight: 390 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 'bold', backgroundColor: '#D9D9D9' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
                <TableBody>
                    {
                        rows.length > 0 ? rows.map(row => (
                            <TableRow key={row.pid}>
                                <TableCell>{row.pid}</TableCell>
                                <TableCell>{row.pname}</TableCell>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.testtype}</TableCell>
                                <TableCell>{row.testresults}</TableCell>
                               
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        onClick={() => 
                                            selectedResult(
                                                {
                                                  pid: row.pid, 
                                                    name: row.pname,
                                                    id: row.id,
                                                    testtype: row.testtype,
                                                    testresults: row.testresults,
                                                    
                                                }
                                            )} // Fix here: changed user.id to row.id
                                        sx={{
                                            color: 'blue',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 255, 0.1)',
                                            },
                                        }}
                                        style={{ marginRight: '10px' }}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        color="secondary"
                                        onClick={() => window.confirm('Are you sure?') && deleteResults({ id: row.id })}
                                        sx={{
                                            color: 'red',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                                            },
                                        }}
                                    >
                                        <Delete />
                                    </IconButton>

                                </TableCell>
                            </TableRow>
                        )) : null // Added a null check to handle the case where rows.length is 0
                    }
                </TableBody>

            </Table>
        </TableContainer>
       
    
      </Paper>
    );

    }
export default TestresulltTable;
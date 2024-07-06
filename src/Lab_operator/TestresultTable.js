import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const TestresulltTable = ({ rows, selectedResult, deleteResults }) => {
 

     const handleEditUser = (id) => {
        console.log(`Editing appointment with ID ${id}`);
    };

    const handleDeleteUser = (pid) => {
        // Implement delete user functionality here
        console.log(`Deleting user with ID ${pid}`);
    }; 

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Patient ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Appointment Id</TableCell>
                        <TableCell>Test</TableCell>
                        <TableCell>Test Result</TableCell>
                        <TableCell>Action</TableCell>
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
    );
}

export default TestresulltTable;
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';

function StickyHeadTable({ setRows, selectedRole, handleChange }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setLocalRows] = useState([]);

  const columns = [
    { id: 'nationalID', label: 'National ID', minWidth: 80 },
    { id: 'name', label: `${selectedRole} Name`, minWidth: 50 },
    { id: 'phonenumber', label: 'phonenumber', minWidth: 50 },
    {
      id: 'email',
      label: 'Email',
      minWidth: 80,
      align: 'right',
    },
    

  ];

  useEffect(() => {
    axios.get('https://healthlabback-git-vercelback-bytebuzzers-projects.vercel.app/api/router_login/users')
      .then(response => {
        const responseData = response.data && response.data.response;
        if (Array.isArray(responseData)) {
          // Filter users by role
          const patientUsers = responseData.filter(user => user.role === selectedRole);
          setLocalRows(patientUsers);
          setRows(patientUsers); // Update the parent component's state
        } else {
          console.error('Data received is not an array:', responseData);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [selectedRole, setRows]); // Include selectedRole in the dependency array

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '80%', overflow: 'hidden', margin: 'auto', textAlign: 'center' }}>
      <TableContainer sx={{ maxHeight: 400, minHeight: 300 }}>
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.nationalID}>
                    {columns.map((column) => {
                      const value = column.id === 'name' ? `${row.firstname} ${row.lastname}` : row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        style={{ backgroundColor: '#D9D9D9', maxHeight: 80}}
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default StickyHeadTable;

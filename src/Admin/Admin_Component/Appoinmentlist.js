// Appoinmentlist.js
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useEffect, useState } from 'react';

const columns = [
  { id: 'id', label: 'Appointment ID', minWidth: 120 },
  { id: 'pname', label: 'Patientname', minWidth: 100 },
  { id: 'regdate', label: 'Registered Date', minWidth: 120 },
  { id: 'selectTests', label: 'Test Types', minWidth: 100 },
  { id: 'billvalue', label: 'Bill Value', minWidth: 80, align: 'right' },
  { 
    id: 'state', label: 'State', minWidth: 100, align: 'right'
  }
];

export default function StickyHeadTable({ setRows }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setLocalRows] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    axios.get('http://localhost:3100/api/appointments')
      .then(response => {
        console.log('Response data:', response.data);
        const responseData = response.data && response.data.response; // Accessing the 'response' key
        if (Array.isArray(responseData)) {
          const modifiedData = responseData.map(item => ({
            ...item,
            regdate: item.regdate.slice(0, 10), // Slice the first 10 characters of regdate
            selectTests: Array.isArray(item.selectTests)
              ? item.selectTests.map(test => test.testName.slice(0, 17)).join(', ') // Join test names with a comma
              : 'No tests', // Handle the case where selectTests is not an array
          })).filter(item => item.state === "result_add" || item.state === "Doctor_approved"); // Apply filter
          setLocalRows(modifiedData);
          setRows(modifiedData); // Update parent component's rows state
          console.log('Data is an array. Setting rows.');
        } else {
          console.error('Data received is not an array:', responseData);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [setRows]); // Add filter to dependency array

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = (columnId) => {
    if (sortColumn === columnId) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnId);
      setSortDirection('asc');
    }
  };

  const sortedRows = React.useMemo(() => {
    if (sortColumn) {
      const sortedData = [...rows].sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];
        if (valueA < valueB) {
          return sortDirection === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
      return sortedData;
    }
    return rows;
  }, [rows, sortColumn, sortDirection]);

  return (
    <Paper sx={{ width: '80%', overflow: 'hidden', margin: 'auto', textAlign: 'center' }}>
      <TableContainer sx={{ maxHeight: 420, minHeight: 390 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 'bold', backgroundColor: '#D9D9D9' }}
                  onClick={() => handleSort(column.id)}
                >
                  {column.label}
                  {sortColumn === column.id && (
                    sortDirection === 'asc' ? ' ▲' : ' ▼'
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'id' ? (
                            <a href={`/Reportpreview/${value}`} style={{ textDecoration: 'underline', color: '#101754' }}>
                              {value}
                            </a>
                          ) : (
                            column.format && typeof value === 'string'
                              ? column.format(value)
                              : value
                          )}
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
        style={{ backgroundColor: '#D9D9D9' }}
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

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Changed import statement

const columns = [
  { id: 'id', label: 'Appointment ID', minWidth: 170 },
  { id: 'regdate', label: 'Registered Date', minWidth: 100 },
  { id: 'selectTests', label: 'Test Types', minWidth: 100 },
  { id: 'billvalue', label: 'Bill Value', minWidth: 170, align: 'right' },
];

export default function StickyHeadTable({ setRows }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setLocalRows] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    axios.get('https://healthlabbackend.vercel.app/api/appointments')
      .then(response => {
        const responseData = response.data && response.data.response; // Accessing the 'response' key
        if (Array.isArray(responseData)) {
          console.log('Data received:', responseData);
          const modifiedData = responseData
            .filter(item => item.state === 'register_only' && item.pid === jwtDecode(localStorage.getItem("myToken")).id)
            .map(item => ({
              ...item,
              regdate: item.regdate.slice(0, 10), // Slice the first 10 characters of regdate
              selectTests: Array.isArray(item.selectTests)
          ? item.selectTests.map(test => test.testName.slice(0, 15)).join(', ') // Join test names with a comma
          : 'No tests', // Handle the case where selectTests is not an array
            }));
          console.log('Modified data:', modifiedData);
          console.log('id is ', jwtDecode(localStorage.getItem("myToken")).id);
          setLocalRows(modifiedData);
          setRows(modifiedData); // Update parent component's rows state
        } else {
          console.error('Data received is not an array:', responseData);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [setRows]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (orderBy === 'billvalue') {
      return order === 'asc' ? a.billvalue - b.billvalue : b.billvalue - a.billvalue;
    } else {
      return order === 'asc' ? a.id - b.id : b.id - a.id;
    }
  });

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
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'id' ? (
                          <a href={`/Invoicepreview/${value}`} style={{ textDecoration: 'underline', color: '#101754' }}>
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
              ))}
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

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
import NotificationIcon from '@mui/icons-material/NotificationImportant';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

const columns = [
  { id: 'id', label: 'Report ID', minWidth: 70},
  { id: 'notification', label: ' ', minWidth: 10, align:'left' }, // New column for notification button
  { id: 'regdate', label: 'Registered Date', minWidth: 70 },
  { id: 'selectTests', label: 'Test Types', minWidth: 100 },
  { id: 'state', label: 'Current State', minWidth: 80 },
  { id: 'billvalue', label: 'Bill Value', minWidth: 80, align: 'right' }
  
];

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  useEffect(() => {
    axios.get('https://healthlabback-git-vercelback-bytebuzzers-projects.vercel.app/api/appointments')
      .then(response => {
        console.log('Response data:', response.data);
        const responseData = response.data && response.data.response; // Accessing the 'response' key
        if (Array.isArray(responseData)) {
          const filteredData = responseData.filter(item => (
            (item.state === 'result_add' || item.state === 'Doctor_approved') && item.pid === jwtDecode(localStorage.getItem("myToken")).id)
          ).map(item => ({
            ...item,
            regdate: item.regdate.slice(0, 10), // Slice the first 10 characters of regdate
            selectTests: Array.isArray(item.selectTests)
              ? item.selectTests.map(test => test.testName.slice(0, 17)).join(', ') // Join test names with a comma
              : 'No tests', // Handle the case where selectTests is not an array
          }));
          setRows(filteredData); // Update parent component's rows state
          console.log("id 01", jwtDecode(localStorage.getItem("myToken")).id);

        } else {
          console.error('Data received is not an array:', responseData);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const sortedRows = rows.sort((a, b) => {
    if (orderBy === '') return 0;
    if (order === 'asc') {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    }
    return a[orderBy] > b[orderBy] ? -1 : 1;
  });

  const handleLinkClick = (event, value, state) => {
    event.preventDefault(); // Prevent default link behavior
    console.log(`Appointment state: ${state}`);
    if (state === 'Doctor_approved' && jwtDecode(localStorage.getItem("myToken")).role === 'PATIENT') {
      axios.post('https://healthlabback-git-vercelback-bytebuzzers-projects.vercel.app/api/updateappointment', { id: value, patientView: 'viewed' })
        .then(response => {
          console.log(`Appointment ${value} viewed by patient successfully!`);
          window.location.href = `/Reportpreview/${value}`; // Navigate to the report preview page
        })
        .catch(error => {
          console.error('Error updating appointment:', error);
        });
    } else {
      // Handle cases where the appointment state is not 'Doctor_approved'
      window.location.href = `/Reportpreview/${value}`; // Navigate to the report preview page
    }
  };

  const handleNotifyClick = (id) => {
    console.log(`Notify clicked for appointment ${id}`);
  };

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
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleRequestSort(column.id)}
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
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'id' ? (
                            <a href={`/Reportpreview/${value}`} style={{ textDecoration: 'underline', color: '#101754' }} onClick={(event) => handleLinkClick(event, value, row.state)}>
                              {value}
                            </a>
                          ) : column.id === 'notification' && row.state === 'Doctor_approved' && row.patientView === 'not_ready' ? (
                            <NotificationIcon onClick={() => handleNotifyClick(row.id)} />  // Add notification icon
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

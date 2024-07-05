import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Typography,
  Box,
  TablePagination
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  PictureAsPdf as PictureAsPdfIcon
} from '@mui/icons-material';

const columns = [
  { id: 'id', label: 'ID', minWidth: 100 },
  { id: 'name', label: 'Name', minWidth: 150 },
  { id: 'test', label: 'Test', minWidth: 150 },
  { id: 'test_tubes', label: 'Test Tubes', minWidth: 150 },
  { id: 'test_tube_id', label: 'Test Tube ID', minWidth: 150 },
  { id: 'blood_type', label: 'Blood Type', minWidth: 150 },
  { id: 'action', label: 'Action', minWidth: 100, align: 'center' },
];

const UsersTable = ({ rows, selectedUser, deleteUser, generatePDF }) => {
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
    <Paper sx={{ width: '100%', overflow: 'hidden', margin: 'auto', textAlign: 'center', marginTop: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2, padding: 4, marginTop: 4 }}>
        <Typography variant="h5">Blood Testing Records</Typography>
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'action' ? (
                          <>
                            <IconButton
                              onClick={() => selectedUser(row)}
                              sx={{
                                color: 'blue',
                                '&:hover': {
                                  backgroundColor: 'rgba(0, 0, 255, 0.1)',
                                },
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => window.confirm('Are you sure?') && deleteUser(row)}
                              sx={{
                                color: 'red',
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 0, 0, 0.1)',
                                },
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => generatePDF(row)}
                              sx={{
                                color: 'green',
                                '&:hover': {
                                  backgroundColor: 'rgba(0, 255, 0, 0.1)',
                                },
                              }}
                            >
                              <PictureAsPdfIcon />
                            </IconButton>
                          </>
                        ) : (
                          value
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
};

export default UsersTable;

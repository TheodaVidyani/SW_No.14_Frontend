// src/Lab_operator/SearchUserForm.js
import React, { useState } from 'react';
import { TextField, IconButton, Paper, Box, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const SearchTestResult = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleButtonClick = () => {
    onSearch(searchTerm);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', margin: 'auto', textAlign: 'center', marginTop: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2, padding: 4, marginTop: 4 }}>
        <TextField
          id="search"
          label="Search Test Results"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleButtonClick}
                  sx={{ backgroundColor: '#00c6e6', color: '#ffffff', '&:hover': { backgroundColor: '#0099b8' } }}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Paper>
  );
};

export default SearchTestResult;

import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchImg from './Labasisstenceimg/SearchImg.jpg';
import ViewAllReportsButton from './ViewAllbutton';

const ReportSearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '900px',
        position: 'relative',
        zIndex: 1,
        backgroundImage: `url(${SearchImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TextField
        sx={{
          width: '400px',
          color: '#000000',
          backgroundColor: 'white',
          marginBottom: '20px', // Add margin bottom to create space between search bar and button
        }}
        label="Enter Report ID"
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <ViewAllReportsButton /> {/* Placing the button directly under the search bar */}
    </Box>
  );
};

export default ReportSearchBar;
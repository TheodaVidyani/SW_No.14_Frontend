import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import { Card, CardContent, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Selectrole from './Selectrole';

export default function PatientSearch({ rows , selectedRole, handleChange}) {
  const [searchValue, setSearchValue] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleSearch = () => {
    if (selectedPatient) {
      console.log(selectedPatient);
      setShowCard(true);
      setShowOverlay(true);
    }
  };

  const handleCloseCard = () => {
    setShowCard(false);
    setShowOverlay(false);
    setSelectedPatient(null);
  };

  return (
    <div style={{ position: 'relative', maxWidth: '50%', margin: '0 auto', paddingBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Selectrole selectedRole={selectedRole}  handleChange={handleChange}/>
        <Autocomplete
          freeSolo
          options={rows}
          getOptionLabel={(row) => row?.firstname + ' ' + row?.lastname || ''}
          filterOptions={(options, { inputValue }) =>
            options.filter((option) =>
              (option?.firstname + ' ' + option?.lastname)?.toLowerCase().includes(inputValue.toLowerCase())
            )
          }
          onChange={(event, value) => setSelectedPatient(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={`Search for a ${selectedRole}`}
              variant="outlined"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              InputProps={{
                ...params.InputProps,
                type: 'search',
                sx: { borderRadius: '20px' },
              }}
              style={{ width: '500px' }} // Adjust width as needed
            />
          )}
        />
        <IconButton onClick={handleSearch} sx={{ width: '2cm' }}>
          <SearchIcon sx={{ color: 'action.active', ml: 1.5 }} />
        </IconButton>
      </div>

      {showCard && selectedPatient && (
        <>
          {showOverlay && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 999,
              }}
              onClick={handleCloseCard}
            ></div>
          )}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              borderRadius: '20px',
              boxShadow: '0 8px 12px rgba(0, 0, 0, 1)',
              zIndex: 1000,
            }}
          >
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                width: '100%',
                minWidth: 400,
                margin: 'auto',
                borderRadius: 5,
                backgroundColor: '#f5f5f5',
                padding: '0px 20px',
              }}
              size="large"
            >
              <CardContent>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                {selectedPatient?.firstname + " " + selectedPatient?.lastname}
                </Typography>
                <Typography variant="body1">
                  {selectedPatient && (
                    <ul style={{ listStyleType: 'circle', padding: 0 }}>
                      
                      <li><strong>Name:</strong> {selectedPatient?.firstname + " " + selectedPatient?.lastname}</li>
                      <li><strong>National ID:</strong> {selectedPatient?.nationalID}</li>
                      <li><strong>Email:</strong> {selectedPatient?.email}</li>
                      <li><strong>Address:</strong> {selectedPatient?.address}</li>
                      <li><strong>Role:</strong> {selectedPatient?.role}</li>
                      <li><strong>Contact Number:</strong> {selectedPatient?.phonenumber}</li>
                      <li><strong>Username:</strong> {selectedPatient?.username}</li>
                      <li><strong>Password:</strong> {selectedPatient?.password}</li>
                    </ul>
                  )}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

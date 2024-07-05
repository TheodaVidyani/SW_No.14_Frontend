import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import { Card, CardContent, Typography, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

export default function Appointmentsearch({ rows }) {
  const [searchValue, setSearchValue] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (selectedAppointment) {
      console.log(selectedAppointment);
      setShowCard(true);
      setShowOverlay(true);
    }
    console.log("appointment is " + JSON.stringify(rows));
  };

  const handleCloseCard = () => {
    setShowCard(false);
    setShowOverlay(false);
    setSelectedAppointment(null);
  };

  const handlePreview = () => {
    if (selectedAppointment) {
      console.log("preview invoice");
      navigate(`/Invoicepreview/${selectedAppointment.id}`);
    }
  };

  return (
    <div style={{ position: 'relative', maxWidth: '50%', margin: '0 auto', paddingBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Autocomplete
          freeSolo
          options={rows}
          getOptionLabel={(row) => row?.id ? 'No. ' + String(row.id) + ' - ' + 'Date: ' + row?.regdate.slice(0, 10) : ''}
          filterOptions={(options, { inputValue }) =>
            options.filter((option) =>
              String(option?.id)?.includes(inputValue) || option?.pname?.toLowerCase().includes(inputValue.toLowerCase())
            )
          }
          onInputChange={(event, newValue) => setSearchValue(newValue)}
          onChange={(event, value) => setSelectedAppointment(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for Appointments"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                type: 'search',
                sx: { borderRadius: '20px' },
              }}
              style={{ width: '400px' }}
            />
          )}
        />
        <IconButton onClick={handleSearch} sx={{ width: '2cm' }}>
          <SearchIcon sx={{ color: 'action.active', ml: 1.5 }} />
        </IconButton>
      </div>

      {showCard && selectedAppointment && (
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
              top: '160%',
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
                  {"Appointment No." + selectedAppointment?.id + " : " + selectedAppointment?.regdate.slice(0, 10)}
                </Typography>
                <Typography variant="body1">
                  {selectedAppointment && (
                    <ul style={{ listStyleType: 'circle', padding: 0 }}>
                      <li><strong>Appointment ID:</strong> {selectedAppointment?.id}</li>
                      <li><strong>Patient Name:</strong> {selectedAppointment?.pname}</li>
                      <li><strong>Patient ID:</strong> <br />{selectedAppointment?.pid}</li>
                      <li><strong>Blood Tests:</strong> <br />
                        {Array.isArray(selectedAppointment.selectTests) ? 
                          selectedAppointment.selectTests.map(test => <ul key={test.testName}>{test.testName}</ul>)
                          : 'No tests'}
                      </li>
                      <li><strong>Registered Date:</strong> <br />{selectedAppointment?.regdate.slice(0, 10)}</li>
                      <li><strong>Appointment Current State:</strong> {selectedAppointment?.state}</li>
                      <li><strong>Appointment Billvalue:</strong>{" LKR " + selectedAppointment?.billvalue}</li>
                    </ul>
                  )}
                </Typography>
                <Typography>
                  <Button onClick={handlePreview}
                    style={{ color: '#101754', backgroundColor: '#D9D9D9', border: '1px solid #101754', borderRadius: '5px', padding: '5px 10px', maxWidth: '150px' }}>
                    Invoice
                  </Button>
                </Typography>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

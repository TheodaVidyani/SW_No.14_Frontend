import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Axios from 'axios';
import SelectTable from './SelectTable';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function BasicSelect() {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedTestsForTable, setSelectedTestsForTable] = useState([]); 
  const [selectedTestDescription, setSelectedTestDescription] = useState('');
  const [testDetails, setTestDetails] = useState('');
  const [patientId, setPatientId] = useState();
  const [patientName, setpatientName] = useState(null); 
  const [state, setState] = useState(null);
  const [regdate, setRegdate] = useState(null);
  const [billValue, setBillValue] = useState(0); // Initialize billValue to 0
  const [patientView, setPatientView] = useState(null);
  // Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getTests();
  }, []);

  // Close the Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const getTests = () => {
    Axios.get('https://helthlabback-git-vercelback-bytebuzzers-projects.vercel.app/api/tests')
      .then((response) => {
        setTests(response.data?.response || []);
      })
      .catch((error) => {
        console.error('Axios Error : ', error);
      });
  };

  const handleChange = (event) => {
    const selectedTestId = event.target.value;
    // Check if the selected test is already in selectedTestsForTable
    const isAlreadySelected = selectedTestsForTable.some(test => test.id === selectedTestId);

    if (!isAlreadySelected) {
      setSelectedTest(selectedTestId);
      const selectedTest = tests.find((test) => test.id === selectedTestId);
      if (selectedTest) {
        setSelectedTestDescription(selectedTest.description);
        Axios.get(`https://helthlabback-git-vercelback-bytebuzzers-projects.vercel.app/api/tests/${selectedTestId}`)
          .then((response) => {
            setTestDetails(response.data?.details || '');
            console.log(selectedTestId);
          })
          .catch((error) => {
            console.error('Axios Error : ', error);
          });
      }
    } else {
      console.log('Test is already selected');
    }
  };

  const handleConfirm = () => {
    if (selectedTest) {
      const decodedToken = jwtDecode(localStorage.getItem("myToken"));
      setPatientId(decodedToken.id);
      setpatientName(decodedToken.name);
      setState('register_only');
      setPatientView('not_ready');
      setRegdate(new Date());

      // Find the selected test object from the tests array
      const selectedTestObject = tests.find((test) => test.id === selectedTest);
      // Add selected test object to the table
      const updatedSelectedTests = [...selectedTestsForTable, selectedTestObject];
      setSelectedTestsForTable(updatedSelectedTests);

      // Calculate bill value
      const testValues = updatedSelectedTests.map(test => test.price);
      const calculatedBillValue = testValues.reduce((total, value) => total + value, 0);
      setBillValue(calculatedBillValue);

      setSelectedTest(null);
      setSelectedTestDescription('');
      setTestDetails('');

      // Sort
      setSelectedTestsForTable(prevSelectedTests => prevSelectedTests.sort((a, b) => a.id - b.id));
    }
  };

  const handleFinal = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = (action) => {
    if (action === 'payNow') {
      // Handle Pay Now logic here
      navigate(`/Paymentpreview/${billValue}`); // Redirect to Payment page
    } else if (action === 'payLater') {
      // Handle Pay Later logic here
    }

    const selectTestIds = selectedTestsForTable.map(test => test.id);
    const selectTestNames = selectedTestsForTable.map(test => test.name);
    
    // Create a new appointment object
    const newAppointment = {
      selectTestIds: selectTestIds,
      selectTestNames: selectTestNames,
      patientId: patientId,
      patientName: patientName,
      state: state,
      regdate: regdate,
      billValue: billValue,
      patientView: patientView,
    };

    console.log("date is " + regdate);
    // Show success Snackbar
    setSnackbarMessage('Appointment added successfully');
    setSnackbarOpen(true);

    fetch('https://helthlabback-git-vercelback-bytebuzzers-projects.vercel.app/api/addappointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAppointment) // Pass the new appointment object as JSON data
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // You can handle success response as needed
      })
      .catch(error => {
        console.error('Error:', error);
      });

    setIsModalOpen(false);
  };

  return (
    <Box sx={{ width: '75%', margin: 'auto', backgroundColor: '#D9D9D9', padding: '30px 20px', borderRadius: '15px' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" sx={{ color: '#101754' }}>
          Blood Test Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedTest || ''}
          label="Blood Test Type"
          onChange={handleChange}
          sx={{ backgroundColor: '#FFFFFF' }}
        >
          {tests.map((test) => (
            <MenuItem key={test.id} value={test.id}>
              {test.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedTestDescription && (
        <Typography variant="subtitle1" sx={{ marginTop: '10px' }}>
          {selectedTestDescription}
        </Typography>
      )}

      {testDetails && (
        <Typography variant="subtitle1" sx={{ marginTop: '10px' }}>
          {testDetails}
        </Typography>
      )}

      <Box sx={{ marginLeft: 'auto', marginTop: '10px' }}>
        <Button sx={{ variant: 'contained', color: '#FFFFFF', background: '#101754', width: '100px', fontWeight: 'bold' ,'&:hover': { background: 'rgba(16, 23, 84, 0.7)' }}} onClick={handleConfirm}>
          SELECT
        </Button>
      </Box>

      {/* Displaying selected tests in a table */}
      {selectedTestsForTable.length > 0 && <SelectTable tests={selectedTestsForTable} />}

      <Box sx={{ marginLeft: 'auto', marginTop: '10px' }}>
        {selectedTestsForTable.length > 0 && (
          <Button sx={{ variant: 'contained', color: '#FFFFFF', background: '#101754', width: '100px', fontWeight: 'bold' ,'&:hover': { background: 'rgba(16, 23, 84, 0.7)' }}} onClick={handleFinal}>
            CONFIRM
          </Button>
        )}
      </Box>

      {/* Payment Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            padding: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)'
          }
        }}
      >
        <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold' }}>Payment</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Please choose your payment method:</Typography>
        </DialogContent>
        <DialogActions >
          <Button onClick={() => handleModalClose('payNow')} sx={{ color: '#101754' ,width: '100%'}}>Pay Now</Button>
          <Button onClick={() => handleModalClose('payLater')} sx={{ color: '#101754',width: '100%' }}>Pay Later</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <Button sx={{ color: "#ffffff" }} size="small" onClick={handleCloseSnackbar}>
            CLOSE
          </Button>
        }
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      />
    </Box>
  );
}

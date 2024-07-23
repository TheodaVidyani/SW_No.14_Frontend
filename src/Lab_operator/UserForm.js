import React, { useEffect, useState } from "react";
import { Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Snackbar, Box, Paper } from "@mui/material";
import axios from "axios";

const UserForm = ({ addUser, updateUser, submitted, data, isEdit }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [testTubes, setTestTubes] = useState([]);
  const [bloodType, setBloodType] = useState('');
  const [selectedTube, setSelectedTube] = useState('');
  const [testTubeId, setTestTubeId] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isNicValid, setIsNicValid] = useState(true);
  const [usedAppointments, setUsedAppointments] = useState([]);

  useEffect(() => {
    if (!submitted) {
      resetForm();
    }
  }, [submitted]);

  useEffect(() => {
    if (data?.id && data.id !== 0) {
      setId(data.id.toString());
      setName(`${data.firstname} ${data.lastname}`); // Concatenate firstname and lastname
      setSelectedAppointment(data.test);  // Assuming this field is for selected test
      setBloodType(data.blood_type);
      setSelectedTube(data.test_tubes);
      setTestTubeId(data.test_tube_id);
    }
  }, [data]);

  useEffect(() => {
    fetchTestTubes();
  }, []);

  const fetchTestTubes = async () => {
    try {
      const response = await axios.get('http://localhost:3100/api/test_tubes');
      setTestTubes(response.data.response || []);
    } catch (error) {
      console.error('Error fetching test tubes:', error);
    }
  };

  const fetchAppointments = async (userId) => {
    try {
      console.log(`Fetching appointments for user ID: ${userId}`);
      const response = await axios.get('http://localhost:3100/api/appointments');
      console.log('Appointments response:', response.data);
      const userAppointments = response.data.response.filter(appointment => appointment.pid === userId);
      setAppointments(userAppointments);
      console.log('Filtered appointments:', userAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.name = name ? '' : 'Name is required.';
    tempErrors.selectedAppointment = selectedAppointment ? '' : 'Appointment selection is required.';
    tempErrors.selectedTube = selectedTube ? '' : 'Test tube selection is required.';
    tempErrors.bloodType = bloodType ? '' : 'Blood type is required.';
    tempErrors.testTubeId = testTubeId.length >= 4 ? '' : 'Test Tube ID must be at least 4 characters long.';
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = (actionFunc, successMessage) => {
    if (validateForm()) {
      actionFunc({
        id,
        name,
        test: selectedAppointment,
        test_tubes: selectedTube,
        test_tube_id: testTubeId,
        blood_type: bloodType
      });
      handleSnackbarOpen(successMessage);
      resetForm();
    }
  };

  const resetForm = () => {
    setId('');
    setName('');
    setSelectedAppointment('');
    setBloodType('');
    setSelectedTube('');
    setTestTubeId('');
    setErrors({});
    setUsedAppointments([]);
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const fetchPatientNameAndAppointments = async (nic) => {
    try {
      console.log(`Fetching patient name for NIC: ${nic}`);
      const response = await axios.get('http://localhost:3100/users');
      console.log('Response from server:', response.data);

      const users = response.data.response;
      const user = users.find(user => user.nationalID === nic);
      if (user && user.firstname && user.lastname) {
        setName(`${user.firstname} ${user.lastname}`); // Concatenate firstname and lastname
        setIsNicValid(true);
        fetchAppointments(user._id);
        console.log(`Found patient: ${user.firstname} ${user.lastname}`);
      } else {
        setName('');
        setIsNicValid(false);
        setSnackbarMessage('No patient found with this NIC');
        setSnackbarOpen(true);
        console.log('No patient found with this NIC');
      }
    } catch (error) {
      console.error('Error fetching patient name:', error);
      setSnackbarMessage(`Error fetching patient name: ${error.message}`);
      setSnackbarOpen(true);
      setIsNicValid(false);
    }
  };

  const handleNicBlur = () => {
    if (id) {
      fetchPatientNameAndAppointments(id);
    }
  };

  const handleAppointmentChange = (e) => {
    setUsedAppointments([...usedAppointments, e.target.value]);
    setSelectedAppointment(e.target.value);
  };

  return (
    <Paper sx={{ width: '97%', margin: 'auto', backgroundColor: '#D9D9D9', padding: '20px', borderRadius: '8px', marginTop: '80px' }}>
      <Typography variant="h4" sx={{ color: '#333', mb: 4 }}>
        Blood Testing Application
      </Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          fullWidth
          label="NIC"
          variant="outlined"
          value={id}
          onChange={(e) => setId(e.target.value)}
          onBlur={handleNicBlur}
          sx={{ backgroundColor: '#fff', borderRadius: 1 }}
        />
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          sx={{ backgroundColor: '#fff', borderRadius: 1 }}
          InputProps={{
            readOnly: true,
          }}
        />
        <FormControl fullWidth variant="outlined" sx={{ backgroundColor: '#fff', borderRadius: 1 }} disabled={!isNicValid}>
          <InputLabel>Appointment</InputLabel>
          <Select
            value={selectedAppointment}
            onChange={handleAppointmentChange}
            label="Appointment"
            error={!!errors.selectedAppointment}
          >
            {appointments.map((appointment) => (
              appointment.selectTests.map((test) => (
                <MenuItem 
                  key={test.testId} 
                  value={test.testName} 
                  disabled={usedAppointments.includes(test.testName)}
                  style={{ color: usedAppointments.includes(test.testName) ? 'grey' : 'black' }}
                >
                  {test.testName}
                </MenuItem>
              ))
            ))}
          </Select>
          <Typography variant="caption" color="error">{errors.selectedAppointment}</Typography>
        </FormControl>
        <FormControl fullWidth variant="outlined" sx={{ backgroundColor: '#fff', borderRadius: 1 }} disabled={!isNicValid}>
          <InputLabel>Test Tube</InputLabel>
          <Select
            value={selectedTube}
            onChange={(e) => setSelectedTube(e.target.value)}
            label="Test Tube"
            error={!!errors.selectedTube}
          >
            {testTubes.map((tube) => (
              <MenuItem key={tube._id} value={tube.tube_type}>{tube.tube_type}</MenuItem>
            ))}
          </Select>
          <Typography variant="caption" color="error">{errors.selectedTube}</Typography>
        </FormControl>
        <TextField
          fullWidth
          label="Test Tube ID"
          variant="outlined"
          value={testTubeId}
          onChange={(e) => setTestTubeId(e.target.value)}
          error={!!errors.testTubeId}
          helperText={errors.testTubeId}
          sx={{ backgroundColor: '#fff', borderRadius: 1 }}
          disabled={!isNicValid}
        />
        <FormControl fullWidth variant="outlined" sx={{ backgroundColor: '#fff', borderRadius: 1 }} disabled={!isNicValid}>
          <InputLabel>Blood Type</InputLabel>
          <Select
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
            label="Blood Type"
            error={!!errors.bloodType}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="A+">A+</MenuItem>
            <MenuItem value="A-">A-</MenuItem>
            <MenuItem value="B+">B+</MenuItem>
            <MenuItem value="B-">B-</MenuItem>
            <MenuItem value="AB+">AB+</MenuItem>
            <MenuItem value="AB-">AB-</MenuItem>
            <MenuItem value="O+">O+</MenuItem>
            <MenuItem value="O-">O-</MenuItem>
          </Select>
          <Typography variant="caption" color="error">{errors.bloodType}</Typography>
        </FormControl>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#00c6e6',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#0099b8',
            },
            mt: 2
          }}
          onClick={() => handleSubmit(isEdit ? updateUser : addUser, isEdit ? 'The testing was successfully updated' : 'The testing was successfully added')}
          disabled={!isNicValid}
        >
          {isEdit ? 'Update' : 'Add'}
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        action={
          <Button sx={{ color: '#ffffff' }} size="small" onClick={() => setSnackbarOpen(false)}>
            CLOSE
          </Button>
        }
        sx={{ backgroundColor: '#4caf50', color: '#fff' }}
      />
    </Paper>
  );
}

export default UserForm;

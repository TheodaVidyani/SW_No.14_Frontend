// AddTest.js
import React, { useState } from 'react';
import Patienthead from '../Components/Patienthead'; 
import Footer from '../Components/Footer'; 
import '../maincss/AddTest.css';
import { Button, Grid, Snackbar } from '@mui/material'; 
import BasicTextFields from './Admin_Component/Entersection';


function AddTest() {
  // State to manage form data
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    adddate: new Date().toISOString().split('T')[0],
  });

  // State to manage Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Function to handle changes in form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (!formData.id || !formData.name || !formData.description) {
      
      // Show fail Snackbar
      setSnackbarMessage('Failed to add test');
      setSnackbarOpen(true);
      return;
    }

    if (!(Number.isInteger(parseInt(formData.id, 10)))) {
      console.log('not int');
      console.log(formData.id);
      // Show error Snackbar
      setSnackbarMessage('ID must be an integer');
      setSnackbarOpen(true);
      return;
    }

    if (parseInt(formData.min, 10) > parseInt(formData.max, 10)) {
      console.log('min greater');
      console.log(formData.min, ' ', formData.max);
      // Show error Snackbar
      setSnackbarMessage('MINIMUM value greater than MAXIMUM');
      setSnackbarOpen(true);
      return;
    }
  

    fetch('https://helthlabback.vercel.app/api/addtest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Reset form data
        setFormData({
          id: '',
          name: '',
          description: '',
          min: '',
          max: '',
          unit: '',
          price: '',
          adddate: new Date().toISOString().split('T')[0],
        });
      
      // Show success Snackbar
      setSnackbarMessage('Test added successfully');
      setSnackbarOpen(true);
    })
      .catch((error) => {
        console.error('Error:', error);

       // Show error Snackbar
      setSnackbarMessage('Error adding test');
      setSnackbarOpen(true);
      });
  };
  // Function to close the Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  return (
    <div className="AddTest">
      
      <Patienthead /><br />
      
      <Grid sx={{ align: 'center', paddingTop: '100px', minHeight: '85vh' ,}}>
        
        <BasicTextFields handleChange={handleChange} formData={formData} />
        
        <Button
          onClick={handleSubmit}
          sx={{
            borderRadius:'20px',
            variant: 'contained',
            color: '#FFFFFF',
            background: '#101754',
            display: 'block',
            margin: 'auto',
            marginBottom: '40px',
            marginTop: '20px',
            width:'13%',
            padding:'10px',
            minWidth:'20vh',
            fontWeight: 'bold',
          }}>
          ADD TEST TYPE
        </Button>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <Button sx={{color:"#ffffff"}} size="small" onClick={handleCloseSnackbar}>
            CLOSE
          </Button>
        }
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      />
      
      <Footer />
    </div>
  );
}

export default AddTest;


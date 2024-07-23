//Entersection.js
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddToPhotosTwoToneIcon from '@mui/icons-material/AddToPhotosTwoTone';
import { Grid, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import axios from 'axios';

function BasicTextFields({ handleChange, formData }) {
  const [maxId, setMaxId] = useState(0);

  useEffect(() => {
    axios.get('https://helthlabback.vercel.app/api/tests')
  .then(response => {
    const responseData = response.data && response.data.response; // Accessing the 'response' key
    if (Array.isArray(responseData) && responseData.length > 0) {
      // Response data is an array and has elements
      const maxTestId = Math.max(...responseData.map(test => test.id));
      setMaxId(maxTestId);
      console.log('max id is:', maxTestId);
    } else {
      
      setMaxId(0);
      console.error('No data available or invalid response format: ', responseData);
    }
  })
  .catch(error => {
    console.error('Error fetching test details:', error);
  });



  }, []); // Empty dependency array to run the effect only once when the component mounts

  useEffect(() => {
    handleChange({ target: { id: 'id', value: maxId + 1 } });
    
  }, [handleChange, maxId]);
  
  return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Grid sx={{ alignItems: 'center', paddingBottom: '1%' }}>
        <AddToPhotosTwoToneIcon sx={{ fontSize: 48, display: 'block', margin: 'auto' , color: '#101754'}} />
        <Typography variant="h5" align="center" sx={{ fontWeight: 'bold' , color: '#101754'}}>ADD NEW TESTS</Typography>
      </Grid>

      <Box
        component="form"
        sx={{
          backgroundColor: '#FFFFFF',
          width: '35%',
          minWidth:'30vh',
          maxWidth:'60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > :not(style)': { m: 1, width: '80%' },
          margin: 'auto',
          borderRadius: '15px',
          padding: '30px',
          paddingLeft:'5px',
          paddingRight:'5px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.7)', 
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={2} direction="column" >
          <Grid item container spacing={6}>
            
            <Grid item xs={6}>
              <TextField id="id" label="id" variant="outlined" value={formData.id} onChange={handleChange} disabled />
            </Grid>
            <Grid item xs={6}>
              <TextField id="name" label="name" variant="outlined" value={formData.name} onChange={handleChange} />
            </Grid>
          </Grid>
          <Grid item >
            <TextField id="description" label="description" variant="outlined" value={formData.description} onChange={handleChange} sx={{width:'100%'}} />
          </Grid>
          <Grid item container spacing={4}>
            <Grid item xs={4}>
              <TextField id="min" label="min" variant="outlined" value={formData.min} onChange={handleChange} />
            </Grid>
            <Grid item xs={4}>
              <TextField id="max" label="max" variant="outlined" value={formData.max} onChange={handleChange} />
            </Grid>
            <Grid item xs={4}>
            <Autocomplete
              id="unit"
              options={['mg/dL', 'g/dL', 'cs/μL', 'td/μL']}
              freeSolo
              value={formData.unit}
              onChange={(event, newValue) => {
                handleChange({ target: { id: 'unit', value: newValue } });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="unit"
                  variant="outlined"
                  value={formData.unit}
                  onChange={handleChange}
                />
              )}
            />
            </Grid>
          </Grid>
          <Grid item >
            <TextField id="price" label="price" variant="outlined" value={formData.price} onChange={handleChange} sx={{width:'100%'}} />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default BasicTextFields;

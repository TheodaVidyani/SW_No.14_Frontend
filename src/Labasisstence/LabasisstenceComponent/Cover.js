import React from 'react';
import Box from '@mui/material/Box';
import backgroundImage from './Labasisstenceimg/Background.jpg'

const Cover = () => {
  return (
   <Box sx={{
    
    margin:'20px',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', // Ensure the component covers the entire viewport height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    

     <Box       sx={{
      
        position: 'absolute',
        bottom: 0,
        left: 100,
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        color: 'balck',
      }}>   
      {/* <Typography variant="h1"
        sx={{
          typography: 'Roboto', // Specify font family
          fontSize: 32, // Specify font size
          fontWeight: 'bold' // Specify font weight
        }}>The laboratory assistant, as a key member of the laboratory team, plays an important role in ensuring the accuracy and reliability of diagnostic results, thereby serving as a critical safeguard for patient care</Typography> */}
      </Box>
      </Box>
  );
};

export default Cover;
import React from 'react';
import { Box, Typography } from '@mui/material';

function Dhome01() {
  return (
    <Box
      sx={{
        maxWidth: { xs: '90%', sm: '80%', md: '70%', lg: '60%' },
        marginLeft: '50%',
        color: '#101754',
/*         textAlign: 'right',
 */        paddingRight: { xs: '10px', sm: '20px', md: '30px' }, // optional: add some padding to ensure it doesn't stick to the right edge
      }}
    >
      <Typography variant="h1" sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, fontWeight: 'bold', fontStyle: 'italic', letterSpacing: '2px' }}>
        "The Laboratory System Doctor"
      </Typography>
      <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' }, marginTop: '1rem' }}>
        As the ultimate approver of lab reports, plays a pivotal role in ensuring the accuracy and reliability
        of diagnostic results, serving as a critical safeguard for patient care.
      </Typography>
      <Box component="ul" sx={{ fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' }, marginTop: '1rem' }}>
        <li>View Reports</li>
        <li>Give Recommendations</li>
        <li>Approve Reports</li>
      </Box>
    </Box>
  );
}

export default Dhome01;

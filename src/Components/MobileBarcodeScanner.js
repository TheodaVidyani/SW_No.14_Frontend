// src/components/MobileBarcodeScanner.js

import React, { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import Axios from 'axios';

const MobileBarcodeScanner = () => {
    const [scanning, setScanning] = useState(true);

    const handleScan = (err, result) => {
        if (result) {
            // Send the scanned ID to the server
            Axios.post('https://helthlabback.vercel.app/api/updateTestTubeId', { testTubeId: result.text })
                .then(response => {
                    console.log('Test Tube ID updated successfully');
                    setScanning(false);
                })
                .catch(error => {
                    console.error('Error updating Test Tube ID:', error);
                });
        }
        if (err) {
            console.error(err);
        }
    };

    return (
        <Grid container spacing={2} sx={{ padding: '20px' }}>
            <Grid item xs={12}>
                <Typography variant="h6">Scan Test Tube Barcode</Typography>
            </Grid>
            {scanning && (
                <Grid item xs={12}>
                    <BarcodeScannerComponent
                        width="100%"
                        height="100%"
                        onUpdate={handleScan}
                    />
                </Grid>
            )}
            {!scanning && (
                <Grid item xs={12}>
                    <Typography variant="h6">Scan complete. You can close this page.</Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default MobileBarcodeScanner;

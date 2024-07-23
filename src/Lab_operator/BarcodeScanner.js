// src/Lab_operator/BarcodeScanner.js

import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import { Button, Grid, Typography } from '@mui/material';
import Axios from 'axios';

const BarcodeScanner = () => {
    const webcamRef = useRef(null);
    const [scanning, setScanning] = useState(true);
    const [scannedResult, setScannedResult] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            if (webcamRef.current) {
                const imageSrc = webcamRef.current.getScreenshot();
                if (imageSrc) {
                    const image = new Image();
                    image.src = imageSrc;
                    image.onload = () => {
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        canvas.width = image.width;
                        canvas.height = image.height;
                        context.drawImage(image, 0, 0, canvas.width, canvas.height);
                        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                        const code = jsQR(imageData.data, canvas.width, canvas.height);
                        if (code) {
                            setScannedResult(code.data);
                            setScanning(false);
                            clearInterval(interval);
                            // Send the scanned ID to the server
                            Axios.post('https://helthlabback.vercel.app/api/updateTestTubeId', { testTubeId: code.data })
                                .then(response => {
                                    console.log('Test Tube ID updated successfully');
                                })
                                .catch(error => {
                                    console.error('Error updating Test Tube ID:', error);
                                });
                        }
                    };
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [webcamRef]);

    return (
        <Grid container spacing={2} sx={{ padding: '20px' }}>
            <Grid item xs={12}>
                <Typography variant="h6">Scan Test Tube Barcode</Typography>
            </Grid>
            {scanning && (
                <Grid item xs={12}>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width="100%"
                        height="100%"
                    />
                </Grid>
            )}
            {!scanning && (
                <Grid item xs={12}>
                    <Typography variant="h6">Scanned result: {scannedResult}</Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default BarcodeScanner;

// src/Lab_operator/TestTube.js

import React, { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import TestTubeForm from './TestTubeForm';
import Patienthead from '../Components/Patienthead';
import Footer from '../Components/Footer'; 
import TestTubesTable from './TestTubesTable';
import SearchTestTubeForm from './SearchTestTubeForm';
import Axios from 'axios';
import jsPDF from 'jspdf';
import JsBarcode from 'jsbarcode';
import { createCanvas } from 'canvas';
import backgroundImage from '../images/2.png';  // Import the background image


const TestTube = () => {
    const [testTubes, setTestTubes] = useState([]);
    const [filteredTestTubes, setFilteredTestTubes] = useState([]);
    const [submitted, setSubmitted] = useState(false); 
    const [isEdit, setIsEdit] = useState(false);
    const [selectedTestTube, setSelectedTestTube] = useState({});

    useEffect(() => {
        getTestTubes();
    }, []);

    const getTestTubes = () => {
        Axios.get('http://localhost:3100/api/test_tubes')
            .then(response => {
                setTestTubes(response.data?.response || []);
                setFilteredTestTubes(response.data?.response || []);
            })
            .catch(error => {
                console.error("Error fetching test tubes:", error);
            });
    };

    const addTestTube = (data) => {
        return Axios.post('http://localhost:3100/api/createtest_tubes', data)
            .then(response => {
                getTestTubes();
                setSubmitted(false);
                setIsEdit(false);
                return response.data; // Return the response data to handle barcode
            })
            .catch(error => {
                console.error("Axios Error : ", error);
            });
    };

    const updateTestTube = (data) => {
        setSubmitted(true);
        Axios.post('http://localhost:3100/api/updatetest_tubes', data)
            .then(response => {
                getTestTubes();
                setSubmitted(false);
            })
            .catch(error => {
                console.error("Axios Error : ", error);
            });
    };

    const deleteTestTube = (data) => {
        Axios.delete('http://localhost:3100/api/deletetest_tubes', { data })
            .then(response => {
                getTestTubes();
            })
            .catch(error => {
                console.error("Axios Error : ", error);
            });
    };

    const handleSearch = (searchTerm) => {
        const filtered = testTubes.filter(tube =>
            tube.tube_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tube.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTestTubes(filtered);
    };

    const handleGeneratePDF = (tube) => {
        const doc = new jsPDF();
    
        // Add a title
        doc.setFontSize(20);
        doc.text('Test Tube Report', 105, 15, { align: 'center' });
    
        // Generate the barcode using JsBarcode
        const canvas = createCanvas();
        JsBarcode(canvas, tube._id, {
            format: "CODE128",
            displayValue: true,
            fontSize: 18,
        });
    
        // Convert canvas to data URL
        const barcodeDataURL = canvas.toDataURL('image/png');
    
        // Add barcode to PDF
        doc.addImage(barcodeDataURL, 'PNG', 10, 30, 180, 40);
    
        // Add test tube details in a table format
        doc.setFontSize(12);
        doc.text(`Tube Type:`, 10, 80);
        doc.text(`${tube.tube_type}`, 50, 80);
        doc.text(`Description:`, 10, 90);
        
        // Split the description text into multiple lines to fit within the page
        const descriptionLines = doc.splitTextToSize(tube.description, 140);
        doc.text(descriptionLines, 50, 90);
    
        doc.text(`Expiration Date:`, 10, 110 + (descriptionLines.length - 1) * 10);
        doc.text(`${tube.expire_date}`, 50, 110 + (descriptionLines.length - 1) * 10);
        doc.text(`Manufacturer:`, 10, 120 + (descriptionLines.length - 1) * 10);
        doc.text(`${tube.manufacturer}`, 50, 120 + (descriptionLines.length - 1) * 10);
        doc.text(`Location:`, 10, 130 + (descriptionLines.length - 1) * 10);
        doc.text(`${tube.location}`, 50, 130 + (descriptionLines.length - 1) * 10);
    
        // Draw a border around the content
        doc.rect(5, 5, 200, 140 + (descriptionLines.length - 1) * 10);
    
        doc.save(`${tube.tube_type}_barcode.pdf`);
    };

    return (
        <Box sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
        }}>
            <Patienthead />
            <TestTubeForm 
                addTestTube={addTestTube}
                updateTestTube={updateTestTube}
                submitted={submitted}
                data={selectedTestTube}
                isEdit={isEdit}
            />
            <SearchTestTubeForm onSearch={handleSearch} />
            <TestTubesTable 
                rows={filteredTestTubes}
                selectedTestTube={data => {
                    setSelectedTestTube(data);
                    setIsEdit(true);
                }}
                deleteTestTube={data => window.confirm('Are you sure?') && deleteTestTube(data)}
                generatePDF={handleGeneratePDF}
            />
            <Footer />
        </Box>
    );
};

export default TestTube;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Button,
    Grid,
    Typography,
    TextField,
    Snackbar,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

const TestResultForm = ({ testresult, updateResults, submitted, data, isEdit }) => {
    const [id, setId] = useState('');
    const [pid, setPid] = useState('');
    const [pname, setPname] = useState('');
    const [testNames, setTestNames] = useState([]);
    const [selectedTestName, setSelectedTestName] = useState('');
    const [testresults, setTestresults] = useState('');
    const [appointmentIds, setAppointmentIds] = useState([]);
    const [testid, setTestid] = useState('');
    const [submittedTestIds, setSubmittedTestIds] = useState([]); // State to store submitted test IDs
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!submitted) {
            resetForm();
        }
    }, [submitted]);

    useEffect(() => {
        if (data?.id && data.id !== 0) {
            setId(data.id.toString());
            setPname(data.pname);
            setPid(data.pid);
            setTestresults(data.testresults);
            setTestid(data.testid);
        }
    }, [data]);

    useEffect(() => {
        fetchAppointmentIds();
    }, []);

    const fetchAppointmentIds = () => {
        axios.get('https://healthlabbackend.vercel.app/api/appointmentIds')
            .then(response => {
                setAppointmentIds(response.data.appointmentIds);
            })
            .catch(error => {
                console.error('Error fetching appointment IDs:', error);
            });
    };

    useEffect(() => {
        if (id) {
            fetchPatientDetails(id);
        }
    }, [id]);

    const fetchPatientDetails = (appointmentId) => {
        axios.get(`https://healthlabbackend.vercel.app/api/appoinments/${appointmentId}`)
            .then(response => {
                const { pid, pname, selectTests } = response.data.response;

                // Extract all test names and their IDs from selectTests array
                const tests = selectTests.map(test => ({ name: test.testName, id: test._id }));
                
                // Set pname, pid, and testNames in state
                setPid(pid);
                setPname(pname);
                setTestNames(tests);
                
                if (tests.length > 0) {
                    setSelectedTestName(tests[0].name);
                    setTestid(tests[0].id); // Set the test ID for the first test
                }
            })
            .catch(error => {
                console.error('Error fetching appointment details:', error);
            });
    };

    useEffect(() => {
        // Set the test ID based on the selected test name
        const selectedTest = testNames.find(test => test.name === selectedTestName);
        if (selectedTest) {
            setTestid(selectedTest.id);
        }
    }, [selectedTestName, testNames]);

    const validateForm = () => {
        let tempErrors = {};
        tempErrors.id = id ? '' : 'Appointment ID is required.';
        tempErrors.pid = pid ? '' : 'Patient ID is required.';
        tempErrors.pname = pname ? '' : 'Name is required.';
        tempErrors.testName = selectedTestName ? '' : 'Test type is required.';
        tempErrors.testresults = testresults ? '' : 'Test result is required.';
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = (actionFunc, successMessage) => {
        if (validateForm()) {
            // Check if the test ID has already been submitted
            if (submittedTestIds.includes(testid)) {
                handleSnackbarOpen('Test result for this test ID has already been submitted.');
                return;
            }

            actionFunc({
                id,
                pid,
                pname,
                testName: selectedTestName,
                testresults,
                testid // Include the test ID in the submission
            });
            
            // Update submitted test IDs state
            setSubmittedTestIds([...submittedTestIds, testid]);
            
            handleSnackbarOpen(successMessage);
            resetForm();
        }
    };

    const resetForm = () => {
        setId('');
        setPid('');
        setPname('');
        setTestNames([]);
        setSelectedTestName('');
        setTestresults('');
        setTestid(''); // Reset the test ID
        setErrors({});
    };

    const handleSnackbarOpen = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const handleAfterSubmit = () => {
        // Perform additional action after handleSubmit
        axios.post('https://healthlabbackend.vercel.app/api/updateappointment', { id: id, state: 'result_add' })
            .then(response => {
                console.log('Appointment '+ `${id}` +' updated with result entering successfully');
            })
            .catch(error => {
                console.error('Error updating appointment:', error);
            });
    };

    return (
        <Grid container spacing={2} sx={{ backgroundColor: '#f0f0f0', padding: '30px' }}>
            <Grid item xs={12}>
                <Typography variant="h4" sx={{ color: '#333333', marginTop: '100px' }}>
                    Enter Test Results
                </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.id}>
                    <InputLabel id="appointment-id-label">Appointment ID</InputLabel>
                    <Select
                        labelId="appointment-id-label"
                        value={id}
                        onChange={(e) => {
                            setId(e.target.value);
                        }}
                    >
                        {appointmentIds.map((appointmentId) => (
                            <MenuItem key={appointmentId} value={appointmentId}>
                                {appointmentId}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.id && (
                        <Typography variant="caption" color="error">
                            {errors.id}
                        </Typography>
                    )}
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.testName}>
                    <InputLabel id="test-name-label">Test Name</InputLabel>
                    <Select
                        labelId="test-name-label"
                        value={selectedTestName}
                        onChange={(e) => setSelectedTestName(e.target.value)}
                    >
                        {testNames.map((test) => (
                            <MenuItem key={test.id} value={test.name}>
                                {test.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.testName && (
                        <Typography variant="caption" color="error">
                            {errors.testName}
                        </Typography>
                    )}
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Patient ID"
                    variant="outlined"
                    value={pid}
                    onChange={(e) => setPid(e.target.value)}
                    error={!!errors.pid}
                    helperText={errors.pid}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    value={pname}
                    onChange={(e) => setPname(e.target.value)}
                    error={!!errors.pname}
                    helperText={errors.pname}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Test Id"
                    variant="outlined"
                    value={testid}
                    onChange={(e) => setTestid(e.target.value)}
                    disabled
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Test Result"
                    variant="outlined"
                    value={testresults}
                    onChange={(e) => setTestresults(e.target.value)}
                    error={!!errors.testresults}
                    helperText={errors.testresults}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                                    handleSubmit(isEdit ? updateResults : testresult, isEdit ? 'Test result updated successfully' : 'Test result added successfully');
                                    handleAfterSubmit();
                                    }}
                >
                    {isEdit ? 'Update' : 'Add'}
                </Button>
            </Grid>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{ backgroundColor: '#4caf50', color: '#ffffff' }}
            />
        </Grid>
    );
};

export default TestResultForm;

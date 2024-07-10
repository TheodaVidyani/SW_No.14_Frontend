import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import '../../maincss/Class.css';

const FeedbacksUI = () => {
    const feedbacks = [
        { name: 'John Doe', email: 'johndoe@example.com', phoneNumber: '123-456-7890', date: '2022-01-01', feedback: 'Great service!' },
        { name: 'Jane Smith', email: 'janesmith@example.com', phoneNumber: '987-654-3210', date: '2022-01-02', feedback: 'Very satisfied with the support.' },
        { name: 'Alice Johnson', email: 'alicej@example.com', phoneNumber: '555-666-7777', date: '2022-01-03', feedback: 'Will recommend to others.' },
        { name: 'Bob Brown', email: 'bobb@example.com', phoneNumber: '444-555-6666', date: '2022-01-04', feedback: 'Could be better.' },
    ];

    const [expanded, setExpanded] = useState(Array(feedbacks.length).fill(false));

    const handleExpandClick = (index) => {
        const newExpanded = [...expanded];
        newExpanded[index] = !newExpanded[index];
        setExpanded(newExpanded);
    };

    return (
        <div className='Class'>
            <Grid container spacing={3} direction="column" sx={{ paddingTop: '5%' , marginTop: '1%' }}>
                {feedbacks.map((feedback, index) => (
                    <Grid item xs={12} key={index} sx={{ marginTop: '0%', marginBottom: '0%', marginLeft: '17%', marginRight: '17%' }}>
                        <Card className="feedback-card" sx={{ minHeight: 80, backgroundColor: '#E9E9E9', boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.5)', }}>
                            <CardContent>
                                <Grid container justifyContent="space-between" alignItems="center">
                                    <Grid item xs={10}>
                                        {expanded[index] ? (
                                            <>
                                                <Typography variant="h5" component="div">
                                                    {feedback.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Email: {feedback.email}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Phone Number: {feedback.phoneNumber}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Date: {feedback.date}
                                                </Typography>
                                                <Typography variant="body2" color="text.primary" sx={{ marginTop: 2 }}>
                                                    Feedback: {feedback.feedback}
                                                </Typography>
                                            </>
                                        ) : (
                                            <Typography variant="body2" color="text.primary" sx={{ marginTop: 2 }}>
                                                Feedback: {feedback.feedback}
                                            </Typography>
                                        )}
                                    </Grid>
                                    <Grid item>
                                        <Button 
                                            variant="contained"
                                            sx={{ marginTop: 1, backgroundColor: '#101754', width: '20%' }} 
                                            onClick={() => handleExpandClick(index)}
                                        >
                                            {expanded[index] ? 'Hide' : 'View'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default FeedbacksUI;

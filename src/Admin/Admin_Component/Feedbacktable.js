import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import '../../maincss/Class.css';

const FeedbacksUI = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [expanded, setExpanded] = useState([]);

    useEffect(() => {
        fetch('https://helthlabback-git-vercelback-bytebuzzers-projects.vercel.app/getcontacts')
            .then(response => response.json())
            .then(data => {
                setFeedbacks(data.response);
                setExpanded(Array(data.response.length).fill(false));
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleExpandClick = (index) => {
        const newExpanded = [...expanded];
        newExpanded[index] = !newExpanded[index];
        setExpanded(newExpanded);
    };

    return (
        <div className='Class'>
            <Grid container spacing={3} direction="column" sx={{ paddingTop: '5%', marginTop: '1%' }}>
                {feedbacks.map((feedback, index) => (
                    <Grid item xs={12} key={feedback._id} sx={{ marginTop: '0%', marginBottom: '0%', marginLeft: '17%', marginRight: '17%' }}>
                        <Card className="feedback-card" sx={{ minHeight: 80, backgroundColor: '#E9E9E9', boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.5)' }}>
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
                                                    Phone Number: {feedback.phone_number}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Date: {new Date(feedback.date).toLocaleDateString()}
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

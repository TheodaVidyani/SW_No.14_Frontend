import React from 'react';
import Feedbacktable from './Feedbacktable';
import { grid } from '@mui/system';
import Patienthead from '../../Components/Patienthead';
import Footer from '../../Components/Footer';

const FeedbacksUI = () => {
    return (
        <div>
            <Patienthead />
            <Feedbacktable />
            <Footer />
        </div>
    );
};

export default FeedbacksUI;
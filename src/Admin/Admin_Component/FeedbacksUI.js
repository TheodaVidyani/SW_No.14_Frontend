import React from 'react';
import Feedbacktable from './Feedbacktable';
import { grid } from '@mui/system';
import Patienthead from '../../Components/Patienthead';
import Footer from '../../Components/Footer';
import BackToTop from '../../Patient/Selecttest_Components/Scroll';

const FeedbacksUI = () => {
    return (
        <div>
            <Patienthead />
            <BackToTop />
            <Feedbacktable />
            
            <Footer />
        </div>
    );
};

export default FeedbacksUI;
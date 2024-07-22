import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PReportUI from './PReportUI';

// Reportpreview.js

function Reportpreview() {
  const { id } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch('https://healthlabbackend.vercel.app/api/getResults')
      .then(response => response.json())
      .then(data => {
        // Filter the results based on the appointment ID
        const filteredResults = data.filter(result => result.appointmentId === id);
        setResults(filteredResults);
        console.log('Results:', filteredResults);
      })
      .catch(error => {
        console.error('Error fetching results:', error);
      });
  }, [id]);

  return (
    <div>
      <PReportUI results={results} id ={id}/>
    </div>
  );
}

export default Reportpreview;

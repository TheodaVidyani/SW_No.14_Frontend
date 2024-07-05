import React from 'react';
import { useParams } from 'react-router-dom';
import Report from './Report';


function ReportView() {
  const { reportId } = useParams();
  const reportContainerStyle = {
    backgroundColor: 'white',
    padding: '20px', // Optional: adds some padding
    borderRadius: '2px'
    
  };
  return (
    <div style={reportContainerStyle} >
      <Report reportId ={reportId}/>
    </div>
  );
}

export default ReportView;
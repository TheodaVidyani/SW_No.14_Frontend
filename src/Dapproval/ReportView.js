// ReportView.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Report from './Report';

function ReportView() {
  const { id } = useParams();

  return (
    <div>
      <Report id ={id}/>
    </div>
  );
}

export default ReportView;

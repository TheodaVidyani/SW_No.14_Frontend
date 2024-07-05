// Reportpreview.js
import React from 'react';
import { useParams } from 'react-router-dom';
import PReportUI from './PReportUI';

function Reportpreview() {
  const { id } = useParams();

  return (
    <div>
      <PReportUI id ={id}/>
    </div>
  );
}

export default Reportpreview;

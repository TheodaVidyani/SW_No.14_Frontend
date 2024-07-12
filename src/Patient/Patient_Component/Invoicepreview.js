// Invoicepreview.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Pinvoice from './Pinvoice';

function Invoicepreview() {
  const { id } = useParams();

  return (
    <div>
      <Pinvoice id ={id}/>
    </div>
  );
}

export default Invoicepreview;

// Invoicepreview.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Invoice from '../../Labasisstence/Invoice/Component/invoice';

function Invoicepreview() {
  const { id } = useParams();

  return (
    <div>
      <Invoice id ={id}/>
    </div>
  );
}

export default Invoicepreview;

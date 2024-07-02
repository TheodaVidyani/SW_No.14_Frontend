// Invoicepreview.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Payment from '../../user/PaymentGateway';

function Paymentpreview() {
  const { id } = useParams();

return (
    <div>
      <Payment id ={id}/>
    </div>
);
}

export default Paymentpreview;

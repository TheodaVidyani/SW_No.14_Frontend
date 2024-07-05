import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';  

const stripePromise = loadStripe("pk_test_51P9BvjSDr4UcmSuFL7Q0ooDzuXJbNLkNJJmt72SwnGcItZTzgxd7bqdlkR8U2KAhceGQlgv7LxmdR9we7w59rTNE00cD9yVR25");

const App = ({id}) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm valueid ={id}/>
    </Elements>
  );
};

export default App;

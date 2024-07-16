import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button, Typography, Box, TextField, Snackbar, Alert, CircularProgress, Grid, Container } from '@mui/material';
import axios from 'axios';
import backgroundImage from '../images/2.png';  // Import the background image
import './CheckoutForm.css';

const cardElementOptions = {
  style: {
    base: {
      color: "#424770",
      letterSpacing: "0.025em",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};

const CheckoutForm = ({ valueid }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setAmount(valueid); // Set the amount using the valueid prop
  }, [valueid]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
      setMessage(error.message);
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:5000/api/payment', {
        paymentMethodId: paymentMethod.id,
        amount: parseInt(amount),
        phoneNumber: phoneNumber // Include phone number in the request
      });

      setMessage(data.success ? 'Payment successful!' : `Payment failed: ${data.message}`);
      if (data.success) {
        // Clear the form inputs
        setAmount('');
        setPhoneNumber('');
        cardElement.clear();
      }
    } catch (error) {
      setMessage('Server error: ' + error.message);
      console.error('Payment API error:', error);
    }

    setLoading(false);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Box sx={{ boxShadow: 3, p: 4, borderRadius: 2, backgroundColor: '#fff' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Secure Payment
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Amount"
                  variant="outlined"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  sx={{ mb: 2 }}
                  type="number"
                  InputProps={{
                    startAdornment: <Typography variant="h6" sx={{ marginRight: 1 }}>₹</Typography>
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Phone Number"
                  variant="outlined"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  sx={{ mb: 2 }}
                  type="tel"
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mb: 2, border: '1px solid #ced4da', borderRadius: '4px', padding: '10px' }}>
                  <CardElement options={cardElementOptions} />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button 
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={!stripe || loading}
                  sx={{ py: 1.5, mt: 2, mb: 2, fontWeight: 'bold' , width: '100%'}}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Pay Now'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{ width: '100%' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="info"
            sx={{ width: '100%', fontSize: '1.1rem', '.MuiAlert-message': { fontSize: '1rem' } }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default CheckoutForm;

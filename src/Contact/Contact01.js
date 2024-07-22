import React, { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from 'axios';

export default function Contact01() {
  const methods = useForm();
  const { handleSubmit, reset } = methods;

  const [alertMessage, setAlertMessage] = useState('');

  const onSubmit = async (data) => {
    console.log('Submitting data:', data);
    try {
      const response = await axios.post('https://healthlabbackend.vercel.app/api/contact', {
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
        feedback: data.feedback,
        date: data.date,
      });

      console.log('Response:', response);
      setAlertMessage('Submitted successfully!');
      setAlertMessage('Email sent successfully!');

      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setAlertMessage('Failed to submit.');
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ margin: '3rem' }}>
          <h4>Name</h4>
          <NameField /><br />
          <h4>Email</h4>
          <EmailField /><br />
          <h4>Phone number</h4>
          <PhoneNumberField /><br />
          <h4>Date</h4>
          <DateField /><br />
          <h4>Feedback</h4>
          <MessageField /><br />
          <br /><br />
          <Button type="submit" sx={{ variant: 'contained', color: '#FFFFFF', background: '#101754', width: '300px', height: '50px' }}>
            Submit
          </Button>
        </div>
        {alertMessage && <p>{alertMessage}</p>}
      </form>
    </FormProvider>
  );
}

const NameField = () => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <TextField
      sx={{ width: '75%' }}
      label="Name"
      name="name"
      required
      error={!!errors.name}
      helperText={errors.name?.message}
      {...register("name", {
        required: "Name is required",
        minLength: { value: 3, message: "Name must be at least 3 characters long" },
        maxLength: { value: 20, message: "Name must be no more than 20 characters long" },
      })}
    />
  );
};

const EmailField = () => {
  const { register, formState: { errors } } = useFormContext();
  const emailRegex = new RegExp("[^ @]*@[^ @]*");
  return (
    <TextField
      sx={{ width: '75%' }}
      label="Email"
      name="email"
      required
      error={!!errors.email}
      helperText={errors.email?.message}
      {...register("email", {
        required: "Email is required",
        pattern: { value: emailRegex, message: "Email must be a valid email address" },
      })}
    />
  );
};

const PhoneNumberField = () => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <TextField
      sx={{ width: '75%' }}
      label="Phone Number"
      name="phone_number"
      required
      error={!!errors.phone_number}
      helperText={errors.phone_number?.message}
      {...register("phone_number", {
        required: "Phone number is required",
        minLength: { value: 10, message: "Phone number must be at least 10 digits long" },
        maxLength: { value: 15, message: "Phone number must be no more than 15 digits long" },
      })}
    />
  );
};

const DateField = () => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <TextField
      sx={{ width: '75%' }}
      label="Date"
      type="date"
      name="date"
      InputLabelProps={{ shrink: true }}
      required
      error={!!errors.date}
      helperText={errors.date?.message}
      {...register("date", {
        required: "Date is required",
      })}
    />
  );
};

const MessageField = () => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <TextField
      sx={{ width: '75%' }}
      label="Feedback"
      name="feedback"
      required
      error={!!errors.feedback}
      helperText={errors.feedback?.message}
      multiline
      rows={6}
      {...register("feedback", {
        required: "Feedback is required",
        maxLength: { value: 500, message: "Message must be no more than 500 characters long" },
      })}
    />
  );
};

//UserProfileUpdate.js
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Grid, Avatar, Typography, TextField, Button, Paper, Modal, Slider } from '@mui/material';
import { styled } from '@mui/system';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './cropImage'; // Ensure this is the correct path

const Root = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

const AvatarWrapper = styled('div')({
  position: 'relative',
  cursor: 'pointer',
  width: '120px',
  height: '120px',
  '&:hover .label': {
    display: 'flex',
  },
});

const AvatarImage = styled(Avatar)(({ theme }) => ({
  width: '100%',
  height: '100%',
}));

const Label = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  zIndex: 10000,
  color: '#ffffff',
  transition: 'background-color 0.2s ease-in-out',
  borderRadius: '50%',
  display: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

const CameraIcon = styled(CameraAltIcon)({
  marginBottom: '4px',
});

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: '#101754',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#1e88e5',
  },
}));

//Notification Component
const Notification = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: '#808080',
  color: '#FFFFFF',
  zIndex: 10000,
  display: 'none', // Initially hide the notification
}));

const UserProfileUpdate = ({ userData, onClose }) => {
  const [user, setUser] = useState({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    phonenumber: '',
    nationalID: '',
    username: '',
    profilePic: null,
    profilePicUrl: '',
  });

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppingImage, setCroppingImage] = useState(false);
  const [showNotification, setShowNotification] = useState(false); // State for showing the notification. State variable to manage the display of the notification.

  useEffect(() => {
    if (userData) {
      setUser({ ...userData, profilePicUrl: userData.profilePic });
      console.log('User data set:', userData);
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  //user.profilePic is set to the selected File object, and user.profilePicUrl to the URL for preview purposes.
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      console.log('Selected profile picture URL:', fileUrl);
      setUser({
        ...user,
        profilePic: file,
        profilePicUrl: fileUrl,
      });
      setCroppingImage(true);
      console.log('Selected profile picture:', file);
    }
  };

  const handleAvatarClick = () => {
    document.getElementById('avatarInput').click();
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
    console.log('Crop complete:', croppedArea, croppedAreaPixels);
  }, []);

  const handleSaveCroppedImage = useCallback(async () => {
    try {
      console.log('Cropping image with URL:', user.profilePicUrl);
      const croppedImage = await getCroppedImg(user.profilePicUrl, croppedAreaPixels);
      console.log('Cropped Image Blob:', croppedImage);

      const file = new File([croppedImage], 'profile.jpg', { type: 'image/jpeg' });
      console.log('Cropped Image File:', file);

      const newProfilePicUrl = URL.createObjectURL(file);
      console.log('New Profile Pic URL:', newProfilePicUrl, user);

      setUser((prevUser) => ({
        ...prevUser,
        profilePic: file,
        profilePicUrl: newProfilePicUrl,
      }));
      setCroppingImage(false);
    } catch (e) {
      console.error('Error cropping image:', e);
    }
  }, [croppedAreaPixels, user.profilePicUrl]);

  useEffect(() => {
    console.log('Profile Pic URL changed:', user.profilePicUrl);
  }, [user.profilePicUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting user data:', user);

    const formData = new FormData();

    if (user.profilePic) {
      formData.append('profilePic', user.profilePic);
    }

    Object.keys(user).forEach((key) => {
      if (key !== 'profilePic' && key !== 'profilePicUrl') {
        formData.append(key, user[key]);
      }
    });

    console.log('FormData content:', Array.from(formData.entries()));

    // Add your API endpoint and headers here
    const apiUrl = 'http://localhost:3100/api/router_login/updateuser';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to update profile:', errorText);
        throw new Error('Failed to update profile');
      }

      const responseData = await response.json();
      console.log('Profile updated successfully:', responseData);

            // Show notification on successful update
            setShowNotification(true);

                  // Hide notification after 2 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 2000); //Timer setting

      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Container component={Root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={3} style={{ textAlign: 'center' }}>
          <AvatarWrapper onClick={handleAvatarClick}>
            <AvatarImage src={user.profilePicUrl} alt="User Profile" />
            <Label className="label">
              <CameraIcon />
              <div>Change Image</div>
            </Label>
          </AvatarWrapper>
          <input id="avatarInput" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          <Typography variant="h6">{user.username}</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <form onSubmit={handleSubmit}>
            <TextFieldStyled fullWidth label="First Name" name="firstname" variant="outlined" value={user.firstname} onChange={handleChange} />
            <TextFieldStyled fullWidth label="Last Name" name="lastname" variant="outlined" value={user.lastname} onChange={handleChange} />
            <TextFieldStyled fullWidth label="Email" name="email" variant="outlined" value={user.email} onChange={handleChange} />
            <TextFieldStyled fullWidth label="Address" name="address" variant="outlined" value={user.address} onChange={handleChange} />
            <TextFieldStyled fullWidth label="National ID" name="nationalID" variant="outlined" value={user.nationalID} onChange={handleChange} />
            <TextFieldStyled fullWidth label="Phone Number" name="phonenumber" variant="outlined" value={user.phonenumber} onChange={handleChange} />
            <TextFieldStyled fullWidth label="User Name" name="username" variant="outlined" value={user.username} onChange={handleChange} />
            <ButtonStyled type="submit" variant="contained">
              Save Changes
            </ButtonStyled>
          </form>
        </Grid>
      </Grid>

      <Modal open={croppingImage} onClose={() => setCroppingImage(false)}>
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: '80%', height: '80%', backgroundColor: '#fff', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Cropper
              image={user.profilePicUrl}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div style={{ marginTop: '20px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e, zoom) => setZoom(zoom)}
              style={{ width: '80%' }}
            />
            <ButtonStyled onClick={handleSaveCroppedImage}>Save</ButtonStyled>
          </div>
        </div>
      </Modal>

            {/* Notification for changes updated */}
            <Notification style={{ display: showNotification ? 'block' : 'none' }}>
        Changes Updated
      </Notification>

    </Container>
  );
};

export default UserProfileUpdate;
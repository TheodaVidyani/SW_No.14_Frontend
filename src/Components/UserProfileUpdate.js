import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Avatar, Typography, TextField, Button, Paper, Modal, Slider, Snackbar } from '@mui/material';
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

const Notification = styled(Snackbar)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

const UserProfileUpdate = ({ userData, onUpdateProfilePic, onClose, onProfileUpdate }) => {
  const [user, setUser] = useState({
    _id: '',
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
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (userData) {
      setUser({ ...userData, profilePicUrl: userData.profilePic });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setUser({
        ...user,
        profilePic: file,
        profilePicUrl: fileUrl,
      });
      setCroppingImage(true);
    }
  };

  const handleAvatarClick = () => {
    document.getElementById('avatarInput').click();
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSaveCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(user.profilePicUrl, croppedAreaPixels);
      const base64Image = await toBase64(croppedImage);

      setUser((prevUser) => ({
        ...prevUser,
        profilePic: base64Image,
      }));
      setCroppingImage(false);

      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      address: user.address,
      nationalID: user.nationalID,
      phonenumber: user.phonenumber,
      username: user.username,
      profilePic: user.profilePic,
    };

    try {
      const response = await axios.post('https://helthlabback.vercel.app/api/router_login/updateuser', userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('myToken')}`, // Ensure to include the JWT token in the request header
        },
      });

      const data = response.data;

      setUser((prevUser) => ({
        ...prevUser,
        ...data.updatedUser,
        profilePicUrl: data.updatedUser.profilePic,
      }));
      setShowNotification(true); // Show notification on successful update
      onClose(); // Close the update UI
      onProfileUpdate(); // Fetch updated profile data
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
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, backgroundColor: 'white', padding: 20, boxShadow: 24, outline: 'none' }}>
          <Typography variant="h6" component="h2">
            Crop Image
          </Typography>
          <div style={{ position: 'relative', width: '100%', height: 400 }}>
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
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(e, zoom) => setZoom(zoom)}
          />
          <ButtonStyled onClick={handleSaveCroppedImage}>Save</ButtonStyled>
        </div>
      </Modal>

      <Notification
        open={showNotification}
        autoHideDuration={3000}
        onClose={() => setShowNotification(false)}
        message="Profile updated successfully!"
      />
    </Container>
  );
};

export default UserProfileUpdate;

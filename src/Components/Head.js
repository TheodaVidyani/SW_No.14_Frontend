import React from 'react';
import { AppBar, Tab, Button, Tabs, Typography, Toolbar, useMediaQuery, useTheme, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material/';
import LocalHospitalTwoToneIcon from '@mui/icons-material/LocalHospitalTwoTone';
import MenuIcon from '@mui/icons-material/Menu';
import { Route, Link, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

export default function Head() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <div>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="./HomePage/ser">
          <ListItemText primary="Services" />
        </ListItem>
        <ListItem button component={Link} to="/about">
          <ListItemText primary="About us" />
        </ListItem>
        <ListItem button component={Link} to="/contact">
          <ListItemText primary="Contact us" />
        </ListItem>
        <ListItem button component={Link} to="/login">
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem button component={Link} to="/signup">
          <ListItemText primary="Signup" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <AppBar position="static" sx={{ background: "#D9D9D9" }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { md: 'none' } }}
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', fontFamily: 'Helvetica', fontSize: '30px', color: '#101754', flexGrow: 1 }}>
          <LocalHospitalTwoToneIcon fontSize="large" style={{ marginRight: '10px', color: '#101754' }} />
          HealthLab
        </Typography>
        {!isMobile ? (
          <>
            <Tabs sx={{ marginLeft: 'auto' }}>
              <Tab label="Home" component={Link} to="/" />
              <Tab label="Services" component={Link} to="/services" />
              <Tab label="About us" component={Link} to="/about" />
              <Tab label="Contact us" component={Link} to="/contact" />
            </Tabs>
            <Button sx={{ marginLeft: 'auto', background: '#101754' }} variant="contained" component={Link} to="/login">Login</Button>
            <Button sx={{ marginLeft: '10px', marginRight: '10px', background: '#101754' }} variant="contained" component={Link} to="/signup">Signup</Button>
          </>
        ) : null}
      </Toolbar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { md: 'none' } }}
      >
        {drawer}
      </Drawer>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </AppBar>
  );
}

import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './com_css/footer.css';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Tooltip } from '@material-ui/core';

const Footer = () => {
  const handleNumberClick = () => {
    const phoneNumber = '+94789512738';
    const message = 'Help';
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  const handleEmailClick = () => {
    const emailAddress = 'healthlab00@gmail.com';
    const subject = 'Help';
    const emailLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}`;
    window.location.href = emailLink;
  };

  const handleLocationClick = () => {
    window.open("https://maps.app.goo.gl/xKAMiu3y5CjGGhzA8", "_blank");
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-social">
          <a href="https://www.facebook.com/profile.php?id=61563013676968&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>
        <div className="footer-info">
      <Tooltip title="healthlab00@gmail.com">
        <p onClick={handleEmailClick} style={{ cursor: 'pointer', textDecoration: 'none' }}>
          <i><EmailIcon /></i> healthlab00@gmail.com
        </p>
      </Tooltip>
      <Tooltip title="0789512738">
        <p onClick={handleNumberClick} style={{ cursor: 'pointer', textDecoration: 'none' }}>
          <i><CallIcon /></i> 0789512738
        </p>
      </Tooltip>
      <Tooltip title="Goodwill Plaza, Keyzer St, Colombo 10">
        <p onClick={handleLocationClick} style={{ cursor: 'pointer', textDecoration: 'none' }}>
          <i><LocationOnIcon /></i> Goodwill Plaza, Keyzer St, Colombo 10
        </p>
      </Tooltip>
    </div>
      </div>
      <hr className="footer-line" />
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} HealthLab</p>
      </div>
    </footer>
  );
};

export default Footer;

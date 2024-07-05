import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Button, Typography, Grid, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FastForwardIcon from '@mui/icons-material/FastForward';
import LibraryAddSharpIcon from '@mui/icons-material/LibraryAddSharp';
import FormatListNumberedSharpIcon from '@mui/icons-material/FormatListNumberedSharp';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import Groups2SharpIcon from '@mui/icons-material/Groups2Sharp';
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardContainer: {
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
    width: '95%',
  },
  card: {
    borderRadius: theme.spacing(2),
    minHeight: 190,
    minWidth: 330,
    display: 'inline-block',
    margin: theme.spacing(3),
    transition: 'transform 0.5s ease, opacity 0.7s ease', // Add opacity transition
    cursor: 'pointer', // Add cursor pointer for better UX
    boxShadow: '10px 15px 15px rgba(0, 0, 0, 1)', // Add shadow
  },
  button: {
    textTransform: 'none',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  paper: {
    minWidth: 250,
    backgroundColor: theme.palette.background.paper,
    paddingRight:'4%', 
    paddingLeft:'2%',
    // Increased padding
    borderRadius: theme.spacing(1.5), // Rounded border
    transform: 'scale(1.5)', // Increase size by 1.5
    outline: 'none',
    boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.5)', // Add shadow
  },
  clicked: { // Add new style for clicked card
    transform: 'translate(-50%, -50%) scale(0.8)',
    opacity: 0.5,
  },
}));

const CardSlider = ({ cards }) => {
  const classes = useStyles();
  const [position, setPosition] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardClicked, setCardClicked] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    setPosition((prevPosition) => Math.min(prevPosition + 1, cards.length - 2));
  };

  const handlePrev = () => {
    setPosition((prevPosition) => Math.max(prevPosition - 1, 0));
  };

  const handleCardClick = (index) => {
    setSelectedCard(cards[index]);
    setCardClicked(true);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
    setCardClicked(false);
  };

  const handleAction = () => {
    // Define actions based on the selected card
    if (selectedCard) {
      if (selectedCard.title === 'ADD NEW') {
        navigate(`/AddTest/:id`);
      } else if (selectedCard.title === 'AVAILABLE TESTS') {
        navigate(`/AViewTest/:id`);
      } 
      else if (selectedCard.title === 'APPOINTMENTS') {
        navigate(`/ViewAppointment/:id`);
      } 
      else if (selectedCard.title === 'USERS') {
        navigate(`/ViewPatient/:id`);
      } 
      else if (selectedCard.title === 'USERS') {
        navigate(`/ViewPatient/:id`);
      } 
    }
    handleCloseModal();
  };

  // Inside the CardSlider component
  const IconComponent = selectedCard && selectedCard.icon;

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={1}>
          <Button onClick={handlePrev} disabled={position === 0}><ArrowBackIosIcon/></Button>
        </Grid>
        <Grid item xs={10}>
          <div className={classes.cardContainer}>
            {cards.map((card, index) => (
              <Card
                key={index}
                className={`${classes.card} ${cardClicked && classes.clicked}`}
                style={{ transform: `translateX(-${position * 100}%)` }}
                onClick={() => handleCardClick(index)}
              >
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {card.title}
                  </Typography>
                  <Typography color="textSecondary">
                    {card.content}
                  </Typography>
                  <Typography >
                    {<card.icon/>}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </Grid>
        <Grid item xs={1}>
          <Button onClick={handleNext} disabled={position === cards.length - 2}><ArrowForwardIosIcon/></Button>
        </Grid>
      </Grid>
      <Modal
        className={classes.modal}
        open={Boolean(selectedCard)}
        onClose={handleCloseModal}
      >
        <div className={classes.paper}>
          <h2>{selectedCard && selectedCard.title}</h2>
          <p>{selectedCard && selectedCard.content}</p>
          <IconComponent sx={{paddingBottom:'5%'}}/>
          <Button onClick={handleAction} color="primary">CLICK<FastForwardIcon/></Button>
        </div>
      </Modal>
    </div>
  );
};

// Usage
const MyComponent = () => {
  const cards = [
    { title: 'ADD NEW', content: 'Add new tests to the system' , icon:LibraryAddSharpIcon},
    { title: 'AVAILABLE TESTS', content: 'View currently available test types' ,icon:FormatListNumberedSharpIcon},
    { title: 'APPOINTMENTS', content: 'Patient appointments to blood tests' , icon:ListAltSharpIcon},
    { title: 'USERS', content: 'Users already registered to the system' , icon:Groups2SharpIcon},
    { title: 'FEEDBACKS', content: 'User messages' , icon:ChatTwoToneIcon},
    
  ];

  return <CardSlider cards={cards} />;
};

export default MyComponent;

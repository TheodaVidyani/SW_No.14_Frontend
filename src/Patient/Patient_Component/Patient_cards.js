import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Button, Typography, Grid, Modal } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FastForwardIcon from '@mui/icons-material/FastForward';
import WysiwygTwoToneIcon from '@mui/icons-material/WysiwygTwoTone';
import AddToPhotosTwoToneIcon from '@mui/icons-material/AddToPhotosTwoTone';
import PlagiarismTwoToneIcon from '@mui/icons-material/PlagiarismTwoTone';
import FactCheckTwoToneIcon from '@mui/icons-material/FactCheckTwoTone';
import NotificationIcon from '@mui/icons-material/NotificationImportant';

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
    maxWidth: 350,
    display: 'inline-block',
    margin: theme.spacing(3),
    transition: 'transform 0.5s ease, opacity 0.7s ease', 
    cursor: 'pointer', 
    boxShadow: '10px 15px 15px rgba(0, 0, 0, 1)', 
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
    backgroundColor: theme.palette.background.paper,
    paddingRight:'4%',
    minWidth: 230, 
    paddingLeft:'2%',
    borderRadius: theme.spacing(1.5),
    transform: 'scale(1.5)', // Increase size by 1.5
    outline: 'none',
    boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.5)', 
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
    
    if (selectedCard) {
      if (selectedCard.title === 'PENDING') {
        navigate(`/PPendViewAppointment/:id`);
      } else if (selectedCard.title === 'NEW APPOINTMENT') {
        navigate(`/Selecttest`);
      } 
      else if (selectedCard.title === 'HISTORY') {
        navigate(`/PViewAppointment/:id`);
      } 
      else if (selectedCard.title === 'TYPES') {
        navigate(`/PViewTest/:id`);
      } 
    }
    handleCloseModal();
  };

  const calculateValue = () => {
  // Add your logic here to calculate the value dynamically

    return 5;
  };
  
  // Inside the CardSlider component
  const IconComponent = selectedCard && selectedCard.icon;

  return (
    <div className={classes.root}>
      <Grid container justify="center" style={{alignItems: 'center' ,marginLeft:'1%'}}>
        <Grid item xs={1}>
        <Button onClick={handlePrev} disabled={position === 0} style={{color:'#ffffff',backgroundColor:'#1087A5', borderRadius: '50%', visibility: position === 0 ? 'hidden' : 'visible'}}><ArrowBackIosIcon/></Button>
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
                  <Typography variant="h5" component="h2" style={{ display: 'flex' }}>
                    {card.title}
                    {card.title === 'HISTORY' && <NotificationIcon style={{ marginLeft: '50%',fontSize: '2rem',color: 'darkred'}} />}
                    {card.title === 'HISTORY' && 
                      <span style={{ marginLeft: '0.1px', fontWeight:'bold' , verticalAlign: 'super', fontSize: '0.6em' ,color: 'darkred'}}>
                        ({calculateValue()})
                      </span>
                    }
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
        <Button onClick={handleNext} disabled={position === cards.length - 2} style={{color:'#ffffff',backgroundColor:'#1087A5', borderRadius: '50%', visibility: position === cards.length - 2 ? 'hidden' : 'visible'}}><ArrowForwardIosIcon/></Button>
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
    { title: 'PENDING', content: 'View current appointments' , icon:WysiwygTwoToneIcon},
    { title: 'NEW APPOINTMENT', content: 'Add new blood tests appoinments' ,icon:AddToPhotosTwoToneIcon},
    { title: 'HISTORY', content: 'View old blood reports', icon:PlagiarismTwoToneIcon},
    { title: 'TYPES', content: 'View details available test types' , icon:FactCheckTwoToneIcon},

  ];

  return <CardSlider cards={cards} />;
};

export default MyComponent;

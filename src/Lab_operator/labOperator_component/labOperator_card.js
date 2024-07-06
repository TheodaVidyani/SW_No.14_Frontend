// src/Lab_operator/labOperator_component/labOperator_card.js
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Button, Typography, Grid, Modal } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FastForwardIcon from '@mui/icons-material/FastForward';
import WysiwygTwoToneIcon from '@mui/icons-material/WysiwygTwoTone';
import AddToPhotosTwoToneIcon from '@mui/icons-material/AddToPhotosTwoTone';

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
      if (selectedCard.title === 'Add Test Tubes') {
        navigate(`/lab-operator/test-tube`);
      } else if (selectedCard.title === 'Add Blood Testings') {
        navigate(`/lab-operator/users`);
      } else if (selectedCard.title === 'Add Test Results') {
        navigate(`/lab-operator/test-result`);
      } 
      else if (selectedCard.title === 'Veiw Reports') {
        navigate(`/PViewAppointment/:id`);
      } 
    }
    handleCloseModal();
  };

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
                  <Typography>
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
          {IconComponent && <IconComponent sx={{paddingBottom:'10%'}}/>}
          <Button onClick={handleAction} color="primary">CLICK<FastForwardIcon/></Button>
        </div>
      </Modal>
    </div>
  );
};

const LabOperatorCards = () => {
  const cards = [
    { title: 'Add Test Tubes', content: 'View current appointments' , icon:WysiwygTwoToneIcon},
    { title: 'Add Blood Testings', content: 'Add new blood tests appoinments' ,icon:AddToPhotosTwoToneIcon},
    { title: 'Add Test Results', content: 'Add new test results' ,icon:AddToPhotosTwoToneIcon},
    { title: 'View Reports', content: 'View test reports' ,icon:WysiwygTwoToneIcon},
  ];

  return <CardSlider cards={cards} />;
};

export default LabOperatorCards;

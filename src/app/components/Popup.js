import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useWordGame } from '@/app/contexts/WordGameContext';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ $isStarting }) => ($isStarting ? 'transparent' : 'rgba(var(--dark-navy), 0.8)')}; 
  background-image: ${({ $isStarting }) => ($isStarting ? 'url("/images/word-game-images/background-desktop.svg")' : 'none')}; 
  background-size: ${({ $isStarting }) => ($isStarting ? 'cover' : 'auto')}; 
  background-repeat: no-repeat; 
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-wordGameFont);
`;


const PopupContainer = styled.div`
  width: ${({ $biggerPopup }) => ($biggerPopup ? '100%' : '500px')};
  height: ${({ $biggerPopup }) => ($biggerPopup ? '100vh' : 'auto')};
  background: ${({ $biggerPopup }) => ($biggerPopup ? 'url("/images/word-game-images/background-desktop.svg")' : 'url("/images/word-game-images/PopupSmall.png")')};
  background-size: ${({ $biggerPopup }) => ($biggerPopup ? 'cover' : 'contain')}; 
  background-repeat: no-repeat; 
  background-position: center;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: relative;
  gap: 1em;
  padding: 3em 2em;
  z-index: 2;

  @media (max-width: 768px) {
    width: 95%;
    height: ${({ $biggerPopup }) => ($biggerPopup ? '100vh' : 'auto')};
    padding: 2em 1em;
  }

  @media (max-width: 480px) {
    width: 90%;
    height: ${({ $biggerPopup }) => ($biggerPopup ? '100vh' : 'auto')};

  }
`;


const Title = styled.h1`
font-size: 90px;
font-weight: bold;
background-image: linear-gradient(to bottom, #67B6FF, #FFFFFF);
-webkit-background-clip: text;
background-clip: text;
color: transparent;
text-align: center;
position: absolute;
top: -55px;
left: 50%;
transform: translateX(-50%);
width: 100%;
font-family: inherit;
text-transform: capitalize;

  @media (max-width: 480px) {
    font-size: 60px;
    margin-left: 1.5em;
    margin-bottom: 1em;
    top: -40px;
    left: 25%;
  }

  @media (max-width: 385px) {
    font-size: 50px;
    margin-left: 1.5em;
    margin-bottom: 1em;
    top: -40px;
    left: 25%;
  }
`;

const OrdinaryTitle = styled.h1`
font-size: 90px;
  font-weight: bold;
  background-image: linear-gradient(to bottom, #67B6FF, #FFFFFF);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-align: center;
  font-family: inherit;
  text-transform: uppercase;
  z-index: 2;
  padding: 0 20px;
  text-transform: capitalize;

  @media (max-width: 480px) {
    font-size: 50px;
    margin-left: 1.5em;
  }

  @media (max-width: 385px) {
    font-size: 40px;
    margin-left: 1.5em;
    top: -40px;
    left: 25%;
  }
`;

const TransparentOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(var(--dark-navy), 0.4);
  z-index: 1

`;


const Button = styled.button`
  background-color: transparent;
  background-image: url('../images/word-game-images/ButtonDefault.png');
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  width: 300px;
  padding: .65em .75em;
  color: #fff;
  font-size: 30px;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;
  font-family: inherit;

  &:hover {
    transform: scale(.95);
    background-image: url('../images/word-game-images/ButtonHover.png');
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 500px){
    width: 200px;
    font-size: 20px;
  }

  @media (max-width: 350px){
    width: 180px;
    font-size: 18px;
    
    &:last-child {
      margin-bottom: 1em;
    }
  }
`;

const GradientButton = styled(Button)`
  background: linear-gradient(to bottom, #FE71FE, #7199FF);
  background-image: url('../images/word-game-images/GradientButtonDefault.png');
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;


  &:hover {
    background-image: url('../images/word-game-images/GradientButtonHover.png');
  }


`;
const PlayButton = styled.button`
  background: radial-gradient(circle at top, #FE71FE, #7199FF);
  background-image: url('../images/word-game-images/StartGameButton.png');
  background-size: 150px 150px;
  border: 1px solid black;
  border-radius: 50%; 
  width: 150px; 
  height: 150px; 
  cursor: pointer;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2), inset 0 -4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.1s, box-shadow 0.1s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25), inset 0 -4px 8px rgba(0, 0, 0, 0.1);
    background-image: url('../images/word-game-images/StartButtonHover.png');
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  svg {
    width: 50%; 
    height: auto;
  }

  @media (max-width: 450px) {
    background-size: 100px 100px;
    width: 100px; 
    height: 100px; 
  }

  @media (max-width: 350px) {
    background-size: 80px 80px;
    width: 80px; 
    height: 80px; 
  }
`;

const RoundButton = styled.button`
  width: 50px;
  height: 50px;
  background: url('/images/word-game-images/icon-back.svg') no-repeat center, radial-gradient(circle at top, #FE71FE, #7199FF);
  background-size: 50%, cover; 
  border-radius: 50%;
  border: none;
  cursor: pointer;
  outline: none;
  position: absolute;
  top: 80px;
  left: 50px;
  z-index: 20;


  @media (max-width: 768px) {
    top: 10px;
    left: 10px;
  }

  @media (max-width: 480px){
    top: 50px;
    left: 10px;
    width: 40px;
    height: 40px;
  }


`;



const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: rgba(--var(dark-navy), 0.5);
  z-index: 2;
  position: relative;
  height: calc(100vh - 20px); 

  @media (max-width: 768px) {
    flex-direction: column;
    padding-top: 1em;
    overflow-y:scroll;
    padding-top: 25em; /* fixes for chrome,spolis for firefox */
  }

`;

const Card = styled.div`
  width: 200px;
  min-height: 300px;
  border-radius: 30px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  background: rgb(var(--white));
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  flex-grow: 1;
  padding: 30px;
  font-family: inherit;

  @media (max-width: 768px) {
    display: grid;
    grid-template-areas:
    "number title"
    "number text";
    grid-template-columns: 1fr 3fr;
    width: 90%;
    min-height: 200px;
  }

  @media (max-width: 480px) {
    grid-template-areas:
    "number title"
    "text text";
    min-height: 300px;
    padding: 1em;
  }
`;

const CardNumber = styled.div`
  font-size: 3rem;
  color: rgb(var(--blue));
  flex: 0 0 20%;

  @media (max-width: 768px) {
    grid-area: number;
    text-align: left;
    font-size: 5rem;
  }

  @media (max-width: 480px) {
    font-size: 3rem;
  }


`;

const CardTitle = styled.h3`
  font-size: 20px;
  margin: 10px 0;
  color: rgb(var(--dark-navy));
  font-family: inherit;
  letter-spacing: 1px;
  font-weight: normal;
  flex: 0 0 20%;

  @media (max-width: 768px) {
    grid-area: title;
    text-align: left;
    font-size: 20px;
  }
`;

const CardText = styled.p`
  font-size: 16px;
  text-align: center;
  color: grey;
  flex: 1;
  padding: 5px;

  @media (max-width: 768px) {
    grid-area: text;
    text-align: left;
    font-size: 20px;

  }
`;

const RulesCards = ({ onRoundButtonClick }) => {
  const cards = [
    { number: "01", title: 'Choose a category', text: "First, choose a word category, like animals or movies. The computer then randomly selects a secret word from that topic and shows you blanks for each letter of the word." },
    { number: "02", title: 'Guess letters', text: "Take turns guessing letters. The computer fills in the relevant blank spaces if your guess is correct. If it's wrong, you lose some health, which empties after eight incorrect guesses." },
    { number: "03", title: 'Win or loose', text: "You win by guessing all the letters in the word before your health runs out. If the health bar empties before you guess the word, you lose." }
  ];

  return (
    <>
      <RoundButton onClick={onRoundButtonClick} />
      <CardContainer>
        {cards.map((card, index) => (
          <Card key={index}>
            <CardNumber>{card.number}</CardNumber>
            <CardTitle>{card.title}</CardTitle>
            <CardText>{card.text}</CardText>
          </Card>
        ))}
      </CardContainer>
    </>
  );
};

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 4;
  position: relative;
  overflow-x: hidden;

  @media (max-width: 1000px){
    max-height: 80vh;
    margin-bottom: 1em;
    margin-top: 1em;
  }

  @media (max-width: 350px){
    margin-bottom: .5em;
    margin-top: .5em;
  }
`;

const CategoryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: .75em;
  width: 100%;

  @media (min-width: 769px) {
    & > * {
      flex: 1 1 calc(33.333% - 1em); 
    }
  }

  @media (max-width: 768px) {
    & > * {
      flex: 1 1 calc(50% - 1em); 
    }
  }

  @media (max-width: 480px) {
    & > * {
      flex: 1 1 100%; 
    }
  }
`;

const CategoryTitle = styled(OrdinaryTitle)`
  text-align: center;
  text-transform: capitalize;
  margin-bottom: .25em;

  @media (max-width: 480px){
    font-size: 40px;
    margin-bottom: 1em;
  }

  @media (max-width: 380px){
    font-size: 35px;
    
  }

  @media (max-width: 350px){
    font-size: 30px;
    
  }
`;

const CategoryButton = styled(Button)`
background-image: url('../images/word-game-images/CategoryButtonDefault.png');
background-size: contain;
background-position: center;
background-repat:no-repat;
background-color: transparent;
border-radius: 5px;
padding: 10px 20px;
height: 150px;


&:hover {
  background-image: url('../images/word-game-images/ButtonCategoryHoverNew.png');
}


  @media (max-width: 480px){
    font-size: 25px;
    min-width: unset;
    max-width: 95%;
    height: 100px;
  }
`;

const CategoryRoundButton = styled(RoundButton)`
  top: 20px;
  left: 10px;

  @media (max-width: 480px){
    top: 3px;
    left: 10px;
  }
`;

const categories = ["Minecraft", "Movies", "Countries", "Capital Cities", "Sports", "Animals"];

const CategorySelection = ({ onCategorySelect, onRoundButtonClick }) => (
  <CategoryContainer>
    <CategoryTitle>Pick a Category</CategoryTitle>
    <CategoryRoundButton onClick={onRoundButtonClick} />
    <CategoryGrid>
      {categories.map((category, index) => (
        <CategoryButton key={index} color='rgb(var(--blue))' onClick={() => onCategorySelect(category)}>
          {category}
        </CategoryButton>
      ))}
    </CategoryGrid>
  </CategoryContainer>
);

const TitleContainer = styled.div`
  background-image: url('../images/word-game-images/HangmanGroup.png');
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 125px;
  margin-top: -120px;
  margin-left: 140px;


  @media (max-width: 600px) {
    height: 80px;
    margin-top: -60px;
    margin-left: 140px;
  }

  @media (max-width: 350px) {
    height: 70px;
    margin-top: -15px;
    margin-left: 120px;
  }
`;


const MainGameTitle = () => (
  <TitleContainer>

  </TitleContainer>
)



function Popup({ isVisible, onClose, mode, handleMode }) {

  const { startGame, resetGame } = useWordGame();


  const onRoundButtonClick = () => {
    handleMode("start");
  };

  const handleStartGame = (category) => {
    startGame(category);
    onClose();
  };

  // Define buttons for different game states
  let buttons = [
    { label: 'Continue', onClick: () => onClose(), color: 'rgb(var(--blue))' },
    /*  { label: 'New Category', onClick: initiateCategorySelection, color: 'rgb(var(--blue))' } */
    { label: 'Quit Game', onClick: () => { resetGame(); onClose(); }, type: 'gradient' }
  ];

  let title = "";


  if (mode === 'start') {
    buttons = [
      { label: 'How to Play', onClick: () => { handleMode("rules") }, color: 'rgb(var(--blue))' }
    ];
  } else if (mode === 'rules') {
    title = ''
  } else if (mode === 'win') {
    title = 'You won'
    buttons = [
      { label: "Play Again", onClick: () => { resetGame(); onClose(); }, color: 'rgb(var(--blue))' },
      { label: "Change Category", onClick: () => { handleMode("category") }, color: 'rgb(var(--blue))' },
      { label: "Quit Game", onClick: () => { handleMode("start") }, type: 'gradient' }
    ];
  } else if (mode === 'lost') {
    title = "You lose"
    buttons = [
      { label: "Play Again", onClick: () => { resetGame(); onClose(); }, color: 'rgb(var(--blue))' },
      { label: "Change Category", onClick: () => { handleMode("category") }, color: 'rgb(var(--blue))' },
      { label: "Quit Game", onClick: () => { handleMode("start") }, type: 'gradient' }
    ]
  } else if (mode === 'pause') {
    title = "Paused"
    buttons = [
      { label: "Continue", onClick: () => { onClose(); }, color: 'rgb(var(--blue))' },
      { label: "New Category", onClick: () => { handleMode("category") }, color: 'rgb(var(--blue))' },
      { label: "Quit Game", onClick: () => { handleMode("start") }, type: 'gradient' }
    ]

  }


  const svg = <svg xmlns="http://www.w3.org/2000/svg" width="67" height="64" fill="none" viewBox="0 0 67 64">
    <g filter="url(#a)">
      <path fill="#fff" d="m3.381 33.397-.283-1.845C.658 15.62-.563 7.654 4.026 3.32 8.616-1.013 16.31.84 31.7 4.545l2.035.49c21.007 5.058 31.51 7.587 33.051 15.019 1.541 7.431-7.06 14.08-24.26 27.376l-1.753 1.355c-13.98 10.808-20.972 16.212-27.15 13.67-6.18-2.543-7.534-11.382-10.242-29.058Z" />
    </g>
    <defs>
      <filter id="a" width="66.038" height="62.264" x=".925" y=".811" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy="-6" />
        <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0.141176 0 0 0 0 0.188235 0 0 0 0 0.254902 0 0 0 1 0" />
        <feBlend in2="shape" result="effect1_innerShadow_15_637" />
      </filter>
    </defs>
  </svg>


  return (
    isVisible ? (
      <Overlay $isStarting={mode === 'start'}>
        {mode === 'start' ? <TransparentOverlay /> : null}
        <PopupContainer $biggerPopup={mode === 'rules' || mode === "category"}>
          {mode === 'start' ? (
            <MainGameTitle />
          ) : mode === 'rules' ? (
            <>
              <TransparentOverlay />
              <OrdinaryTitle>How to Play</OrdinaryTitle>
            </>
          ) : mode === 'category' ? (
            <>
              <TransparentOverlay />
              <CategorySelection onCategorySelect={handleStartGame} onRoundButtonClick={onRoundButtonClick} />
            </>
          ) : (
            <Title>{title}</Title>
          )}
          {mode === 'rules' ? (
            <>
              <TransparentOverlay />
              <RulesCards onRoundButtonClick={onRoundButtonClick} />
            </>
          ) : (
            <>
              {/* Exclude PlayButton in win, lost, pause, and category modes */}
              {mode !== 'win' && mode !== 'lost' && mode !== 'pause' && mode !== 'category' && (
                <div>
                  <PlayButton key="start-game" onClick={() => handleMode('category')}>{svg}</PlayButton>
                </div>
              )}

              {/*Exclude all buttons if in "category" mode*/}
              {mode !== 'category' && buttons.map((button, index) => (
                button.type === 'gradient' ?
                  <GradientButton key={index} onClick={button.onClick}>
                    {button.label}
                  </GradientButton>
                  :
                  <Button key={index} color={button.color} onClick={button.onClick}>
                    {button.label}
                  </Button>
              ))}
            </>
          )}
        </PopupContainer>
      </Overlay>
    ) : null
  );
}

export default Popup;
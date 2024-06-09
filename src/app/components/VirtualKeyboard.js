'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWordGame } from '../contexts/WordGameContext';
import { motion } from 'framer-motion';

const StyledLetterKey = styled(motion.button)`
  width: 80px;
  height: 54px;
  border-radius: 24px;
  background-color: ${props => props.disabled ? 'rgba(var(--dark-navy), 0.8)' : '#fff'};
  color: rgb(var(--dark-navy));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border: none;
  cursor: pointer;
  font-family: inherit;
  box-sizing: border-box;

  &:disabled {
    cursor: not-allowed;
    outline: 1px solid rgb(var(--blue));
    color: rgb(var(--blue));
  }

  &:focus {
    outline: 2px solid rgb(var(--blue));
  }

  &:hover {
    color: #fff;
    background-color: ${props => props.disabled ? 'rgba(var(--dark-navy), 0.8)' : 'rgb(var(--blue))'};
  }

  @media (max-width: 1025px) {
    width: 40px;
    height: 54px;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    width: 25px;
    height: 54px;
    border-radius: 10px;
  }


  @media (max-width: 375px) {
    width: 21px;
    height: 54px;
    border-radius: 10px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  grid-area: keyboard;
  margin-top: 1em;
  margin: 0 auto;


  @media (max-width: 480px) {
    margin-top: 5rem;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 1025px){
    justify-content: flex-start; 
    flex-wrap: wrap;
  }

`;

const LetterKey = ({ letter }) => {
  const { guessedLetters, addGuessedLetter } = useWordGame();
  const [isPressed, setIsPressed] = useState(false);


  // for animations on Key press
  useEffect(() => {
    if (isPressed) {
      const timer = setTimeout(() => setIsPressed(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isPressed]);


  const handleClick = () => {
    addGuessedLetter(letter);
    setIsPressed(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick();
    }
  };

  const isGuessed = guessedLetters.has(letter);

  return (
    <StyledLetterKey onClick={handleClick}
      disabled={isGuessed}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      animate={isPressed ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 0.3 }}>
      {letter}
    </StyledLetterKey>
  );
};

const VirtualKeyboard = ({ onClick }) => {

  const { guessedLetters, addGuessedLetter, isGameVisible } = useWordGame();

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const rowLength = Math.ceil(alphabet.length / 3);

  // Split the alphabet into three rows
  const rows = [
    alphabet.slice(0, rowLength),
    alphabet.slice(rowLength, rowLength * 2),
    alphabet.slice(rowLength * 2)
  ];

  // for using keyboard
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!isGameVisible) return;
      const letter = event.key.toUpperCase();
      if (alphabet.includes(letter)) {
        addGuessedLetter(letter);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [addGuessedLetter]);

  return (
    <Container>
      {rows.map((row, index) => (
        <Row key={index}>
          {row.split('').map(letter => (
            <LetterKey key={letter} letter={letter} onClick={onClick} />
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default VirtualKeyboard;

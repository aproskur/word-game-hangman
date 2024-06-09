'use client';

import React from 'react';
import styled from 'styled-components';
import { useWordGame } from '../contexts/WordGameContext';
import { motion } from 'framer-motion';

const StyledLetter = styled.div`
  width: 60px;
  height: 74px;
  border-radius: 24px;
  background-color: ${props => props.$isGuessed ? 'rgb(var(--blue))' : 'rgba(var(--dark-navy), 0.8)'};
  color: rgb(var(--white));
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  box-shadow: ${props => props.$isGuessed ? '0px 4px 6px rgba(var(--dark-navy), 0.8)' : '0px 4px 6px rgba(var(--dark-navy), 0.2)'};

  @media (max-width: 850px){
    border-radius: 20px;
    border: 1px solid rgb(var(--blue));
    width: 35px;
    height: 64px;
    font-size: 2.5rem;
    box-shadow: 0px 4px 10px rgb(var(--blue));
}


  @media (max-width: 480px){
    border-radius: 10px;
    border: 1px solid rgb(var(--blue));
    width: 25px;
    height: 64px;
    font-size: 2.5rem;
    box-shadow: 0px 4px 10px rgb(var(--blue));
}
`;

const AnimatedLetter = styled(motion.span)`
  display: inline-block;
`;

const letterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300 } },
};

const Letter = ({ letterToGuess }) => {
    const { guessedLetters } = useWordGame();
    const isGuessed = guessedLetters.has(letterToGuess);

    return (
        <StyledLetter $isGuessed={isGuessed}>
            {isGuessed ? (
                <AnimatedLetter
                    initial="hidden"
                    animate="visible"
                    variants={letterVariants}
                >
                    {letterToGuess}
                </AnimatedLetter>
            ) : (
                ''
            )}
        </StyledLetter>
    );
};

export default Letter;

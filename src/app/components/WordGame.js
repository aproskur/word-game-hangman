'use client';
import React, { useEffect } from 'react';
import { useWordGame } from '../contexts/WordGameContext';
import HeaderWordGame from '../components/HeaderWordGame';
import GameLetter from '../components/Letter';
import VirtualKeyboard from '../components/VirtualKeyboard';
import Popup from '../components/Popup';
import styles from '../page.module.css';
import styled from 'styled-components';
import confetti from 'canvas-confetti';

const StyledLetterContainer = styled.div`
  grid-area: word;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 2em;


  @media (max-width: 480px){
   padding: .2em;
  }


  div.word {
    flex: 1 0 60%;
    display: flex;
    
    gap: 0.3rem;
    justify-content: center;

    @media (max-width: 480px){
        flex: 1 0 100%;
        flex-wrap: wrap;
        gap: 0.2em;
        padding: .2rem;
      }
  }


`;

export default function WordGame() {
    const {
        wordToPlay,
        guessedLetters,
        isGameLost,
        isGameWon,
        isPopupVisible,
        setIsPopupVisible,
        popupMode,
        setPopupMode,
        isGameVisible
    } = useWordGame();

    const togglePopup = () => setIsPopupVisible(!isPopupVisible);

    const triggerConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 100,
            origin: { y: 0.6 }
        });
    };

    useEffect(() => {
        if (isGameLost) {
            setIsPopupVisible(true);
            setPopupMode("lost");
        } else if (isGameWon) {
            triggerConfetti();
            setTimeout(() => {
                setIsPopupVisible(true);
                setPopupMode("win");
            }, 1000);
        }
    }, [isGameLost, isGameWon]);

    const handleMenuClick = () => {
        setPopupMode("pause");
        setIsPopupVisible(true);
    };

    if (!wordToPlay) {
        console.error('WordGameContext not available or wordToPlay is undefined.');
        return <div>Unable to load the game. Please try reloading.</div>;
    }

    return (
        <div className={styles.wordGameContainer}>
            <svg
                className={styles.background}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
            ></svg>
            {isPopupVisible && (
                <Popup
                    isVisible={isPopupVisible}
                    onClose={togglePopup}
                    mode={popupMode}
                    handleMode={setPopupMode}
                />
            )}
            {!isPopupVisible && (
                <>
                    <HeaderWordGame onMenuClick={handleMenuClick} />
                    {isGameVisible && (
                        <StyledLetterContainer>
                            {wordToPlay.map((word, wordIndex) => (
                                <div key={wordIndex} className="word">
                                    {word.map((letter, letterIndex) => (
                                        <GameLetter
                                            key={`${letterIndex}-${letterIndex}`}
                                            letterToGuess={letter}
                                            isGuessed={guessedLetters.has(letter)}
                                        />
                                    ))}
                                </div>
                            ))}
                        </StyledLetterContainer>
                    )}
                    <VirtualKeyboard />
                </>
            )}
        </div>
    );
}
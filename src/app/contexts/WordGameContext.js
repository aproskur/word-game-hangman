import React, { createContext, useState, useContext, useEffect } from 'react';
import data from '../data/data.json';

const WordGameContext = createContext();

export function useWordGame() {
    return useContext(WordGameContext);
}

export const WordGameProvider = ({ children }) => {
    const initializeWords = (phrase) => {
        return phrase.split(' ').map(word => word.toUpperCase().split(''));
    };

    const [wordToPlay, setWordToPlay] = useState([]);
    const [guessedLetters, setGuessedLetters] = useState(new Set());
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [progress, setProgress] = useState(100);
    const [category, setCategory] = useState('');
    const [isGameWon, setIsGameWon] = useState(false);
    const [isGameLost, setIsGameLost] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(true);
    const [popupMode, setPopupMode] = useState('start');
    const [isGameVisible, setIsGameVisible] = useState(false);

    const totalGuesses = 10;

    function getRandomWordFromCategory(category) {
        if (category in data.categories) {
            const words = data.categories[category];
            const randomWord = words[Math.floor(Math.random() * words.length)].name;
            return randomWord;
        } else {
            console.error(`Category "${category}" not found.`);
            return null;
        }
    }

    const startGame = (category) => {
        setCategory(category);
        const newToGuess = getRandomWordFromCategory(category);
        if (newToGuess) {
            setWordToPlay(initializeWords(newToGuess));
            setGuessedLetters(new Set());
            setWrongGuesses(0);
            setProgress(100);
            setIsGameLost(false);
            setIsGameWon(false);
            setIsPopupVisible(false);
            setIsGameVisible(true);
        }
    };

    const addGuessedLetter = (letter) => {
        setGuessedLetters(currentGuessed => {
            const updatedGuessed = new Set(currentGuessed);
            const letterUpper = letter.toUpperCase();


            // Check if the letter has already been guessed (to fix the keyboard counting wrong letter more then once)
            if (updatedGuessed.has(letterUpper)) {
                return currentGuessed;
            }

            updatedGuessed.add(letterUpper);

            const wordLetters = wordToPlay.flat();
            if (!wordLetters.includes(letterUpper)) {
                const newWrongGuesses = wrongGuesses + 1;
                setWrongGuesses(newWrongGuesses);
                updateProgress(newWrongGuesses);

                if (newWrongGuesses >= totalGuesses) {
                    setIsGameLost(true);
                    setIsPopupVisible(true);
                    setPopupMode("lost");
                }
            }

            if (wordLetters.every(char => updatedGuessed.has(char))) {
                setIsGameWon(true);
                setIsPopupVisible(true);
                setPopupMode("win");
            }

            return updatedGuessed;
        });
    };

    const updateProgress = (wrong) => {
        const newProgress = Math.max(0, 100 - (wrong / totalGuesses * 100));
        setProgress(newProgress);
    };

    const resetGame = () => {
        if (category) {
            startGame(category);
        } else {
            console.error('No category selected. Unable to reset the game.');
        }
    };

    useEffect(() => {
        setPopupMode('start');
        setIsPopupVisible(true);
    }, []);

    return (
        <WordGameContext.Provider value={{
            guessedLetters,
            wordToPlay,
            addGuessedLetter,
            startGame,
            resetGame,
            progress,
            category,
            isGameWon,
            isGameLost,
            isPopupVisible,
            setIsPopupVisible,
            popupMode,
            setPopupMode,
            isGameVisible,
            setIsGameVisible
        }}>
            {children}
        </WordGameContext.Provider>
    );
};

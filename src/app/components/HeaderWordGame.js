import React from 'react';
import styled, { keyframes, } from 'styled-components';
import { useWordGame } from '../contexts/WordGameContext';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: inherit;
  grid-area: header;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;

`;

const MenuButton = styled.div`
  width: 55px;
  height: 55px;
  cursor: pointer;
  background: linear-gradient(45deg, #FE71FE, #7199FF);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 480px){
    width: 50px;
    height: 50px;
  }

  @media (max-width: 350px){
    width: 40px;
    height: 40px;
  }
`;

const CategoryName = styled.div`
  font-size: 50px;
  color: #fff;


  @media (max-width: 480px){
    font-size: 30px;
    margin-right: 1em;
  }

  @media (max-width: 350px){
    font-size: 26px;
    margin-right: .65em;
  }
`;

const ProgressBarContainer = styled.div`
  width: 200px;
  height: 18px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0.25em;

  @media (max-width: 480px){
    width: 100px;
  }

  @media (max-width: 350px){
    width: 90px;
  }
`;

const ProgressBarFill = styled.div`
  height: 80%;
  background-color: rgb(var(--dark-navy));
  border-radius: 8px;
`;
const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const HeartContainer = styled.div`
  animation: ${pulseAnimation} 1.5s infinite;
`;

const HeartIcon = () => {
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 54 50">
      <path fill="url(#a)" d="m26.667 49.467-3.867-3.52C9.067 33.493 0 25.253 0 15.2 0 6.96 6.453.533 14.667.533c4.64 0 9.093 2.16 12 5.547 2.906-3.387 7.36-5.547 12-5.547C46.88.533 53.333 6.96 53.333 15.2c0 10.053-9.066 18.293-22.8 30.747l-3.866 3.52Z"/>
      <defs>
        <linearGradient id="a" x1="26.667" x2="26.667" y1="8.567" y2="49.467" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FE71FE"/>
          <stop offset="1" stop-color="#7199FF"/>
        </linearGradient>
      </defs>
    </svg>
  `;

  return <HeartContainer dangerouslySetInnerHTML={{ __html: svgContent }} />;
};

const MenuIcon = () => {
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" fill="none" viewBox="0 0 38 32">
      <path fill="#fff" d="M0 0h38v7H0zM0 13h38v6H0zM0 25h38v7H0z"/>
    </svg>
  `;

  return <div dangerouslySetInnerHTML={{ __html: svgContent }} />;
};

const HeaderWordGame = ({ onMenuClick }) => {
  const { category, progress } = useWordGame();

  return (
    <HeaderContainer>
      <Container>
        <MenuButton onClick={() => (onMenuClick())}><MenuIcon /></MenuButton>
        <CategoryName>{category}</CategoryName>
      </Container>
      <Container>
        <ProgressBarContainer>
          <ProgressBarFill style={{ width: `${progress}%` }} />
        </ProgressBarContainer>
        <HeartIcon />
      </Container>
    </HeaderContainer>
  );
};

export default HeaderWordGame;

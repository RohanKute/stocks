import React, { useContext, useEffect, useState } from 'react';
import MainPage from './MainPage';

export default function GetOnBoard({setIsOnBoard}) {
  const [showMainPage, setShowMainPage] = useState(false);
  const handleButtonClick = () => {
    setIsOnBoard(true)
    setShowMainPage(true); // Set showMainPage to true when button is clicked
  };

  // Render MainPage if showMainPage is true
  if (showMainPage) {
    return <MainPage setIsOnBoard={setIsOnBoard} />;
  }

  // Render the button to trigger showing MainPage
  return (
    <>
      <span>New?</span>
      <button onClick={handleButtonClick}>Register/Login</button>
    </>
  );
}

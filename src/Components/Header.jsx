import React from 'react'
import "./catalogue.css"
import { useEffect, useState } from 'react';


const Header = () => {



  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkmode');
    return savedMode === 'true';
  });


  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);


  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };


  return (
    <div className="header">
      <p className="header-text">Where in the world?</p>
      <button onClick={toggleDarkMode} className="dark-mode-button">Dark Mode</button>
      <img className="moon-icon" src="src/moon-outline.svg" />
    </div>
  )



}
export default Header
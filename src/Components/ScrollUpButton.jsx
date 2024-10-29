import React, { useState, useEffect } from 'react';

const ScrollUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) {
    return null; // Hide the button when at the top of the page
  }


    const scrollToTop = () => {
        window.scrollTo({
            top:0,
            behavior: 'smooth' //smooth scroll
        })
    }
    return (
        <button 
          onClick={scrollToTop} 
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px 15px',
            fontSize: '16px',
            borderRadius: '5px',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Scroll to Top
        </button>
      );
    };

export default ScrollUpButton
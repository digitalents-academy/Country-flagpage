import React, { useState } from 'react';
import './CustomDropdown.css';

export const CustomDropdown = ({ options, placeholder, newMap }) => {
  const [isOpen, setIsOpen] = useState(false); //starts not open
  const [selectedValue, setSelectedValue] = useState(null);

  // Toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle option selection
  const handleOptionClick = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
  };
  const region = 'Europe'
  const filterByRegion = newMap.filter(([_, country]) => { return country.region === region });
  console.log(filterByRegion)
  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedValue ? selectedValue : placeholder || 'Filter by Region'}
        <img className="dropdown-arrow" src="./src/down-arrow.png"></img>
      </div>
      {isOpen && (
        <div className="dropdown-options">
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown-option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


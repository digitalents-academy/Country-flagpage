import React, { useState, useRef } from 'react';
import './CustomDropdown.css';

export const CustomDropdown = ({ options, placeholder, newMap, setState, region, setRegion }) => {
  const [isOpen, setIsOpen] = useState(false); //starts not open
  const [selectedValue, setSelectedValue] = useState(null);

  const dropdownRef = useRef(null);

  // Toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle option selection
  const handleOptionClick = (option) => {
    setSelectedValue(option);
    setRegion(option);
    setIsOpen(false);
    setState(2)
  };

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
              ref={dropdownRef}
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


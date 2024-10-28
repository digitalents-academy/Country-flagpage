import React, { useState, useRef } from 'react';
import './CustomDropdown.css';

export const CustomDropdown = ({ options, placeholder, newMap, setState }) => {
  const [isOpen, setIsOpen] = useState(false); //starts not open
  const [selectedValue, setSelectedValue] = useState(null);
  const [region, setRegion] = useState(null);
  const dropdownRef = useRef(null);

  // Toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle option selection
  const handleOptionClick = (option) => {
    setSelectedValue(option);
    setRegion('Europe');
    setIsOpen(false);
  };

  const filterByRegion = newMap.filter(([_, country]) => { return country.region === region });
  console.log(filterByRegion)

  const filteredCountries = () => {
    if (filterByRegion) {
      const sortedCountries = [...filterByRegion].sort((a, b) => {
        const nameA = a[1].name.common;
        const nameB = b[1].name.common;
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      return sortedCountries.map(([key, { name, population, region, capital, flags }]) => (
        <div key={key} className="country-box" onClick={() => handleCountryClick(name.common)} >
          <img className="flag" src={flags.png} />
          <div className="country-info">
            <p className="country">{name.common}</p>
            <p className="population"><b>Population:</b> {population.toLocaleString()}</p>
            <p className="region"><b>Region:</b> {region}</p>
            <p className="capital"><b>Capital:</b> {capital}</p>
          </div>
        </div>
      ))

    }
  }

  return (
    <div className="dropdown">
      <div>{filteredCountries()}</div>
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


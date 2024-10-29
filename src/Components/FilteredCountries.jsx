import React from 'react';
import './CustomDropdown.css';
import './catalogue.css';

const FilteredCountries = ({ filteredCountries, region, setRegion }) => {



  return (
    <div className="flag-grid">
      {filteredCountries()}
    </div>
  )
}

export default FilteredCountries
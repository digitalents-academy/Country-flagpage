import { useRef, useState } from "react"
import "../catalogue.css"

export default function SearchBar({ setCountryData, nextState }) {
  const [selectedValue, setSelectedValue] = useState('Option 1');
  const inputRef = useRef(null);

  function searchCountry() {
    if (inputRef.current && inputRef.current.value !== '') {
      setCountryData(inputRef.current.value)
      nextState()
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter')
      searchCountry();
  }

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value)
  };


  return (
    <div className="search-bars">
      <div className="search-bar">
        <img className="search-icon" src="src/search-outline.svg" />
        <input ref={inputRef} onKeyDown={handleKeyDown} className="search-bar-text" type="text" placeholder="Search for a country..."></input>
      </div>
    </div>


  )
}
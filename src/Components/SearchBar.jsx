import { useRef } from "react"
import "../catalogue.css"

export default function SearchBar({ setCountryData, nextState }) {
  const inputRef = useRef(null);
  
  function searchCountry(){
    if(inputRef.current && inputRef.current.value !== ''){
      setCountryData(inputRef.current.value)
      nextState()
    }
   }

   function handleKeyDown(event){
    if(event.key === 'Enter' ) 
    searchCountry();
   }
  return (
    <div className="search-bars">
      <div className="search-bar">
        <img className="search-icon" src="src/search-outline.svg" />
        <input ref={inputRef} onKeyDown={handleKeyDown} className="search-bar-text" type="text" placeholder="Search for a country..."></input>
      </div>

      <form action="/action_page.php">
        <select className="filter" defaultValue="filter" name="region" id="regions">
          <option value="filter" disabled="true">Filter by Region</option>
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </form>
    </div>


  )


}
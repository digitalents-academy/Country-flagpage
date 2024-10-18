import "../catalogue.css"



export default function Catalogue({ countriesData, setCountriesData, countryData, setCountryData, state, nextState }) {
  console.log(countriesData)

  const newMap = Object.entries(countriesData)
  //switch to using useRef isntead of queryselector
 
  // Function to set countryData and execute nextState
function handleCountryClick(event) {
  const clickedBox = event.currentTarget; // Get the clicked element
  const countryValue = clickedBox.querySelector('p').innerText;
  setCountryData(countryValue) // Update countryData object
  console.log(countryData)
  nextState(); // Call nextState function
}

// Get all elements with the "country-box" class
const countryBoxes = document.querySelectorAll('.country-box');

// Add event listeners to each country box
countryBoxes.forEach(box => {
  box.addEventListener('click', handleCountryClick);
});

  const displayCountries = () => {
    if (countriesData)
      return newMap.map(([key, { name, population, region, capital, flags }]) => (
        <div className="country-box" >
          <img className="flag" src={flags.png} />
          <div className="country-info">
            <p className="country">{name.common}</p>
            <p className="population"><b>Population:</b> {population}</p>
            <p className="region"><b>Region:</b> {region}</p>
            <p className="capital"><b>Capital:</b> {capital}</p>
          </div>
        </div>
      ))

  }


  return (
    /*     <div className="country-box">
          <img className="flag" src="https://flagcdn.com/w320/af.png" />
          <div className="country-info">
            <p className="country">Afghanistan</p>
            <p className="population"><b>Population:</b> 27,657,145</p>
            <p className="region"><b>Region:</b> Asia</p>
            <p className="capital"><b>Capital:</b> Kabul</p>
            <p>{countriesData.name.common}</p>
          </div>
        </div> */
    <div>
      <div className="flag-grid">
        {displayCountries()}
      </div>
    </div>
  )

}


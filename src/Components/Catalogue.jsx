import "../catalogue.css"



export default function Catalogue({ countriesData, setCountriesData, countryData, setCountryData, state, nextState }) {


  const newMap = Object.entries(countriesData)
 
  // Function to set countryData and execute nextState
/* function handleCountryClick(event) {
  const clickedBox = event.currentTarget; // Get the clicked element
  const countryValue = clickedBox.querySelector('p').innerText;
  setCountryData(countryValue) // Update countryData object
  nextState(); // Call nextState function
} */
function handleCountryClick(countryName){
  if(!countryName){
    console.error('country name is undefined')
    return;
  }
  setCountryData(countryName)
  nextState();
}
  const displayCountries = () => {
    if (countriesData){
    const sortedCountries = [...newMap].sort((a, b) => {
  const nameA = a[1].name.common;
  const nameB = b[1].name.common;
  if (nameA < nameB) return -1;
  if( nameA > nameB) return 1 ;
  return 0;
    });
      return sortedCountries.map(([key, { name, population, region, capital, flags }]) => (
        <div key={key}  className="country-box" onClick={() => handleCountryClick(name.common)} >
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


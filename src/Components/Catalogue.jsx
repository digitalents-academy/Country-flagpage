import "../catalogue.css"



export default function Catalogue({ countriesData, setCountriesData, countryData, setCountryData, state, nextState }) {


  const newMap = Object.entries(countriesData)
 
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
 
    <div>
      <div className="flag-grid">
        {displayCountries()}
      </div>
    </div>
  )

}


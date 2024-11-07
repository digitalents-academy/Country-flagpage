import './App.css'
import { CountryDetails } from './components/CountryDetails'
import { useState, useEffect } from 'react';
import './Components/catalogue.css';
import Catalogue from './Components/Catalogue'
import Header from './Components/Header'
import SearchBar from './Components/SearchBar'
import { CustomDropdown } from './Components/CustomDropdown';
import FilteredCountries from './Components/FilteredCountries';
import ScrollUpButton from './Components/ScrollUpButton';

function App() {
  const [state, setState] = useState(0)
  const [country, setCountry] = useState({});
  const [loading, setLoading] = useState(true);
  const [countriesData, setCountriesData] = useState({});
  const [countryData, setCountryData] = useState('Belgium');
  const nextState = () => { state < 2 ? setState(state + 1) : null };
  const prevState = () => { state > 0 ? setState(state - 1) : null };
  const options = ['Africa', 'Americas', 'Antarctic', 'Europe', 'Oceania'];
  const [region, setRegion] = useState(null);
  useEffect(() => {
    const fetchCountry = async () => {
      setLoading(true);
      try {

        const response = await fetch(`https://restcountries.com/v3.1/name/${countryData}`);
        const data = await response.json();
        if (!response.ok) {
          window.alert('Country does not exist, check the spelling and try again')
          setState(0)
          setCountryData('Belgium')
        } else {
          setCountry(data[0])
          setLoading(false)
        }
      } catch (error) {
        console.log('Error fetching data', error)
        setLoading(false);
      }

    };
    fetchCountry();
  }, [countryData]);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://restcountries.com/v3.1/all`);
        const data = await response.json();
        setCountriesData(data)
        setLoading(false);

      } catch (error) {
        console.log('Error fetching data', error)
        setLoading(false);
      }

    };
    fetchCountries();
  },
    []);

  if (loading) {
    return (
      <p>Loading...</p>
    )
  }
  const newMap = Object.entries(countriesData)

  //Country filter function 

  const filterByRegion = newMap.filter(([_, country]) => { return country.region === region });
  console.log(filterByRegion)

  
  function handleCountryClick(countryName) {
    if (!countryName) {
      console.error('country name is undefined')
      return;
    }
    setCountryData(countryName)
    setState(1);
  }
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
    <>
      <div>
        <Header />
      </div>

      <div>
      {(state === 2 || state === 0) && <CustomDropdown options={options} placeholder="Filter by Region" newMap={newMap} setState={setState} region={region} setRegion={setRegion} />}
        {(state === 2 || state === 0)  && <SearchBar setCountryData={setCountryData} nextState={nextState} />}
        {state === 2 && <FilteredCountries filteredCountries={filteredCountries} region={region} setRegion={setRegion} />}
      </div>

      <div>
        {state === 0 && <Catalogue
          countriesData={countriesData}
          setCountriesData={setCountriesData}
          countryData={countryData}
          setCountryData={setCountryData}
          state={state}
          nextState={nextState}
          newMap={newMap} />}
      </div>

      {state === 1 && <CountryDetails
        country={country}
        setCountry={setCountry}
        countryData={countryData}
        setCountryData={setCountryData}
        loading={loading}
        setLoading={setLoading}
        countriesData={countriesData}
        prevState={prevState}
      />}
      <ScrollUpButton />



    </>


  )
}

export default App
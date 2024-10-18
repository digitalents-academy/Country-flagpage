import './App.css'
import { CountryDetails } from './components/CountryDetails'
import { useState, useEffect } from 'react';
import './catalogue.css'
import Catalogue from './Components/Catalogue'
import Header from './Components/Header'
import SearchBar from './Components/SearchBar'

function App() {
  const [state, setState] = useState(0)
  const [error, setError] = useState(null);    
  const [country, setCountry] = useState({});
  const [loading, setLoading] = useState(true);
  const [countriesData, setCountriesData] = useState({});
  const [countryData, setCountryData] = useState('Belgium');
  const nextState = () => {state < 2 ? setState(state + 1) : null};
  const prevState = () => {state > 0 ? setState(state - 1) : null};
 useEffect(() =>{
    const fetchCountry = async () =>{
      setLoading(true);
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryData}`);
        const data = await response.json();
        setCountry(data[0])
        setLoading(false)
      } catch (error) {
        console.log('Error fetching data', error)
        setLoading(false);
      }
 
    };
   fetchCountry();
  }, [countryData] ); 
 
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

if(loading){
  return( 
    <p>Loading...</p>
  )
 }


  return (
    <>
       <div>
        <Header />
      </div>

      <div>
        <SearchBar />
      </div>

      <div>
       {state === 0 && <Catalogue 
       countriesData={countriesData}
       setCountriesData={setCountriesData} 
       countryData={countryData}
       setCountryData={setCountryData}
       state={state}
       nextState={nextState}/>}
      </div>
 
      {state === 1 && <CountryDetails 
      country={country}
      setCountry={setCountry}
      countryData={countryData}
      loading={loading}
      setLoading={setLoading}
      countriesData={countriesData}/>}
      
   

 
  </>
   
    
  )
}

export default App
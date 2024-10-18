import './App.css'
import { CountryDetails } from './components/CountryDetails'
import { useState, useEffect } from 'react';
import './catalogue.css'
import Catalogue from './Components/Catalogue'
import Header from './Components/Header'
import SearchBar from './Components/SearchBar'

function App() {
 
  const [error, setError] = useState(null);    
  const [country, setCountry] = useState({});
  const [loading, setLoading] = useState(true);
  const [countriesData, setCountriesData] = useState({})
  const countriesName = countriesData.name
  const [countryData, setCountryData] = useState({
    cca3: "BEL"
  })
  const  countryCode = countryData.cca3
 useEffect(() =>{
    const fetchCountry = async () =>{
      setLoading(true);
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${countryCode}`);
        const data = await response.json();
        setCountry(data[0])
        setLoading(false)
      } catch (error) {
        console.log('Error fetching data', error)
        setLoading(false);
      }
 
    };
   fetchCountry();
  }, [countryCode] ); 
 
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://restcountries.com/v3.1/all`);
        const data = await response.json();
        console.log(data)
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
        <Catalogue countriesData={countriesData}
          setCountriesData={setCountriesData} />
      </div>

    </>

  
      <CountryDetails 
      country={country}
      setCountry={setCountry}
      countryCode={countryCode}
      loading={loading}
      setLoading={setLoading}
      countriesData={countriesData}
      
  />
   
    </>
  )
}

export default App
import './App.css'
import { CountryDetails } from './components/CountryDetails'
import { useState, useEffect } from 'react';

function App() {
 
  const [error, setError] = useState(null);    
  const [country, setCountry] = useState({});
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState({})
   const [countryData, setCountryData] = useState({
    cca3: "RUS"
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

useEffect(() =>{
   const fetchCountries = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://restcountries.com/v3.1/all`);
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      setError('Failed to fetch country data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  fetchCountries();
}, [] );

if(loading){
  return( 
    <p>Loading...</p>
  )
 }


  return (
    <>
      <div>

      </div>
  
      <CountryDetails 
      country={country}
      setCountry={setCountry}
      countryCode={countryCode}
      loading={loading}
      setLoading={setLoading}
      countries={countries}
      
  />
   
    </>
  )
}

export default App

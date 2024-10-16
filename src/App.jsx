import { useState, useEffect } from 'react'
import './App.css'
import { CountryDetails } from './components/CountryDetails'

function App() {
  const [country, setCountry] = useState({});
  const [loading, setLoading] = useState(true);


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
        console.log(data)
        setCountry(data[0])
        setLoading(false);
        console.log(country.name.common)
      
      } catch (error) {
        console.log('Error fetching data', error)
        setLoading(false);
      }
 
    };
   fetchCountry();
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
  />
   
    </>
  )
}

export default App

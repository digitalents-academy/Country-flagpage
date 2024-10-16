import { useState, useEffect } from 'react'
import './App.css'
import { CountryDetails } from './components/CountryDetails'

function App() {
  const [count, setCount] = useState(0)
  const [country, setCountry] = useState({});
  const [loading, setLoading] = useState(true);


 const [countryData, setCountryData] = useState({
    name: 'Belgium'
  })
  const  countryName = countryData.name
  useEffect(() =>{
    const fetchCountry = async () =>{
      setLoading(true);
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
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
  },
   [] ); 
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
      countryData={countryData} 
      setCountryData={setCountryData}
      country={country}
      setCountry={setCountry}
      loading={loading}
      setLoading={setLoading}/>
   
    </>
  )
}

export default App

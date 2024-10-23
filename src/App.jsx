import './App.css'
import { CountryDetails } from './components/CountryDetails'
import { useState, useEffect } from 'react';
import './catalogue.css'
import Catalogue from './Components/Catalogue'
import Header from './Components/Header'
import SearchBar from './Components/SearchBar'
import { CustomDropdown } from './Components/CustomDropdown';

function App() {
  const [state, setState] = useState(0)   
  const [country, setCountry] = useState({});
  const [loading, setLoading] = useState(true);
  const [countriesData, setCountriesData] = useState({});
  const [countryData, setCountryData] = useState('Belgium');
  const nextState = () => {state < 2 ? setState(state + 1) : null};
  const prevState = () => {state > 0 ? setState(state - 1) : null};
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
 useEffect(() =>{
    const fetchCountry = async () =>{
      setLoading(true);
      try {
        
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryData}`);
        const data = await response.json();
        if (!response.ok){
          window.alert('Country does not exist, check the spelling and try again')
          setState(0)
          setCountryData('Belgium')
        }else{
        setCountry(data[0])
        setLoading(false)}
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
      <CustomDropdown options={options} placeholder="Please select an option" />
      {state === 0 && <SearchBar setCountryData={setCountryData} nextState={nextState} />}
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
      setCountryData={setCountryData}
      loading={loading}
      setLoading={setLoading}
      countriesData={countriesData}
      prevState={prevState}
     />}
      
   

 
  </>
   
    
  )
}

export default App
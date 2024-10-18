import { useState, useEffect } from 'react'
import './catalogue.css'
import Catalogue from './Components/Catalogue'
import Header from './Components/Header'
import SearchBar from './Components/SearchBar'

function App() {
  const [country, setCountry] = useState({});
  const [loading, setLoading] = useState(true);


  const [countriesData, setCountriesData] = useState({})
  const countriesName = countriesData.name
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
  if (loading) {
    return (
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

  )
}

export default App

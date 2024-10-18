import React from 'react'
import "../catalogue.css"


export default function Catalogue({ countriesData, setCountriesData }) {
  console.log(countriesData)

  const newMap = Object.entries(countriesData)

  const displayCountries = () => {
    if (countriesData)
      return newMap.map(([key, { name, population, region, capital, flags }]) => (
        <div className="country-box">
          <img className="flag" src={flags.png} />
          <div className="country-info">
            <p className="country">{name.common}</p>
            <p className="population"><b>Population:</b> {population}</p>
            <p className="region"><b>Region:</b> {region}</p>
            <p className="capital"><b>Capital:</b> {capital}</p>
          </div>
        </div>
      ))

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


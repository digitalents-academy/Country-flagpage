import React from 'react'
import { useEffect, useState } from 'react'
import './CountryDetails.css'

export const CountryDetails = ({ country,setCountryData}) => {

  console.log(country)
  const flagSrc = country.flags.png;

  const population = country.population;
  const formattedPop = population.toLocaleString();
  const nativeNames = country.name?. nativeName;
  const borders = country?.borders 
  const commaBorders = borders.join(',')
  

  console.log(country.cca3)
  

  return (
    
    <div className='top-lvl-container'>
        <div className='back-btn-container'>
          <button>Back</button>
        </div>
     <div className='flag-and-detail-container'>

      <img src={country.flags.png} />
      <div className='detail-container'>
        <h1>{country.name?.common}</h1>
        <table>
        <tbody>
          <tr>
            <td>Native Names: {nativeNames &&
          Object.entries(nativeNames).map(([langCode, names]) => (
            <ul key={langCode}> 
              {langCode.toUpperCase()} : {names.common}
            </ul>))}
      </td>
            <td>Top Level Domain: {country?.tld[0]}</td>
          </tr>
          <tr>
            <td>Population: {formattedPop}</td>
            <td>Currencies: {JSON.stringify(Object.entries(country.currencies))}</td>
          </tr>
          <tr>
            <td>Region: {country?.region}</td>
            <td>Languages:  {JSON.stringify(country.languages)}</td>
          </tr>
          <tr>
            <td>Sub Region: {country?.subregion}</td>
          </tr>
          <tr>
            <td>Capital: {country?.capital}</td>
          </tr>
        </tbody>
        </table>

        <div className='border-countries-container'>
           
            <div className='border-countries-list'>
            <p >Border Countries: {commaBorders}</p>
            </div>
        </div>
      </div>


     </div>
    </div>
  )
}

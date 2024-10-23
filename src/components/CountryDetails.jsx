import React from 'react'
import { useEffect, useState } from 'react'
import './CountryDetails.css'

export const CountryDetails = ({ country, countriesData, prevState, setCountryData}) => {
  const flagSrc = country.flags?.png;
  const population = country.population;
  const formattedPop = population.toLocaleString();
  const nativeNames = country.name?.nativeName;
  const borders = country?.borders 
  const languages = country.languages ? Object.values(country.languages).join(', ') : 'Penguin Speech'

  //convert the countries data into key-value pairs, where each pair is an array
  const newMap = (Object.entries(countriesData));

  
  const filterBorderCountries = borders ? newMap
  //destructure each entry with the ([_,country]) where the _is used to ignore the key
  //while country holds the individual country object.
  //filter function checks if the cca3 code of the country is included in the borders 
  //array using borders.includes(country.cca3). This returns an array that only contains
  // countries whose cca3 codes are included in the borders array
  //then I map the filtered array to return an array consisting of the countries common
  //names
  
  .filter(([_, country]) => borders.includes(country.cca3)) 
  .map(([_, country]) => country.name.common) : ''; 
 
    const renderCurrencies = () => {
    if(country.currencies)
    return Object.entries(country.currencies).map(([code, { name, symbol }]) => (
       
        <span key={code} className='currency-item'>{name}, {symbol}</span>
       
    ));}
  const renderNativeNames = () =>{
    if(nativeNames)
    return Object.entries(nativeNames).map(([langCode, names]) => names.common).join(', ')}

  const renderBorders = () => {
 
    if(borders)
     return (filterBorderCountries).map(( borderCountry, index,) => (
           
      <span key={index} className='border-countries' onClick={() => setCountryData(borderCountry)} >{borderCountry} </span>
           
        ));} 
   
    
  return (
    
    <div className='top-lvl-container'>
        <div className='back-btn-container'>
          <button className='back-button' onClick={prevState}>Back</button>
        </div>
     <div className='flag-and-detail-container'>  
       <div className='flag-wrapper'>
         <img className='country-flag' id='flag' src={flagSrc} />
       </div> 
      <div className='detail-container'>
        <h1 className='country-name'>{country.name?.common}</h1>
        <table className='details-table'>
        <tbody>
          <tr>
            <td className='native-names'><b>Native Names:</b> {renderNativeNames() }
            </td>
            <td className='top-level-domain'><b>Top Level Domain:</b> {country.tld ? country.tld[0] : 'this country connects to the internet by sticking a fork in a toaster'}</td>
          </tr>
          <tr>
            
            <td className='population'><b>Population:</b> {formattedPop}</td>
            <td><b>Currency & symbol:</b> {renderCurrencies()}</td>
          </tr>
          <tr>
            <td className='region'><b>Region: </b>{country?.region}</td>
            <td className='languages'><b>Languages:</b> {languages}</td>
          </tr>
          <tr>
            <td className='sub-region'><b>Sub Region:</b> {country.subregion}</td>
          </tr>
          <tr>
          <td className='capital'>
  <b>Capital:</b> {
    (() => {
      switch (true) {
        case !country?.capital || country.capital.length === 0:
          return "No capital";
        case country.capital.length > 1:
          return country.capital.join(', ');
        default:
          return country.capital[0];
      }
    })()
  }
</td>
          </tr>
        </tbody>
        </table>

        <div className='border-countries-container'>
           
            <div className='border-countries-list'>
            <p><b>Border Countries: </b><span >{country.borders ? renderBorders()  : 'None' }</span></p>
           
            </div>
        </div>
      </div>

     </div>
    </div>
  )
}

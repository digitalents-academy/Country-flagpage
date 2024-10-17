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
  const commaBorders = borders ? borders.join(', ') : 'none'
  const languages = country.languages ? Object.values(country.languages).join(', ') : 'Penguin Speech'

  console.log(country.cca3)
  console.log(commaBorders)
  const renderCurrencies = () => {
    if(country.currencies)
    return Object.entries(country.currencies).map(([code, { name, symbol }]) => (
       
        <span key={code}>{name}, {symbol}</span>
       
    ));}
  const renderNativeNames = () =>{
    if(nativeNames)
    return Object.entries(nativeNames).map(([langCode, names]) => names.common).join(', ')}
   

  return (
    
    <div className='top-lvl-container'>
        <div className='back-btn-container'>
          <button>Back</button>
        </div>
     <div className='flag-and-detail-container'>  
       <div className='flag-wrapper'>
         <img id='flag' src={flagSrc} />
       </div> 
      <div className='detail-container'>
        <h1>{country.name?.common}</h1>
        <table>
        <tbody>
          <tr>
            <td><b>Native Names:</b> {renderNativeNames()}
            </td>
            <td><b>Top Level Domain:</b> {country?.tld[0]}</td>
          </tr>
          <tr>
            
            <td><b>Population:</b> {formattedPop}</td>
            <td><b>Currency & symbol:</b> {renderCurrencies()}</td>
          </tr>
          <tr>
            <td><b>Region: </b>{country?.region}</td>
            <td><b>Languages:</b> {languages}</td>
          </tr>
          <tr>
            <td><b>Sub Region:</b> {country?.subregion}</td>
          </tr>
          <tr>
            <td><b>Capital:</b> {country?.capital}</td>
          </tr>
        </tbody>
        </table>

        <div className='border-countries-container'>
           
            <div className='border-countries-list'>
            <p><b>Border Countries: </b><span className='border-countries'>{commaBorders}</span></p>
            <p>{country.borders ? country.borders : ''}</p>
            </div>
        </div>
      </div>


     </div>
    </div>
  )
}

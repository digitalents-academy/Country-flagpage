import React from 'react'
import "../catalogue.css"


export default function Header() {

  return (
    <div className="header">
      <p className="header-text">Where in the world?</p>
      <button className="dark-mode">Dark Mode</button>
      <img className="moon-icon" src="src/moon-outline.svg" />
    </div>
  )


}
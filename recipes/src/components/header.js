import React from 'react';
import '../css/header.css';
import headerImage from '../images/nadine-primeau-unsplash.jpg';

function Header(props) {
  return (
    <header className="header">
      <img className="header-image" alt="" src={headerImage} />
      <h1 className="header-heading">Vegan Recipe Zine</h1>
    </header>
  )
}

export default Header

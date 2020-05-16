import React from 'react';
import '../css/header.css';
import headerImage from '../images/nadine-primeau-unsplash.jpg';
import { NavLink } from "react-router-dom";

function Header(props) {
  return (

      <header className="header">
        <img className="header-image" alt="" src={headerImage} />
        <h1 className="header-heading"><NavLink className="home-link" to="/">Vegan Recipe Zine</NavLink></h1>
        <NavLink className="add-link" to="/add-recipe">Add Recipe</NavLink>
      </header>

  )
}

export default Header

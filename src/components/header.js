import React from 'react';
import '../css/header.css';
import headerImage from '../images/nadine-primeau-unsplash.jpg';
import { Link, NavLink } from "react-router-dom";

function Header(props) {
  return (

      <header className="header">
        <img className="header-image" alt="" src={headerImage} />
        <h1 className="header-heading">
          <Link className="home-link" to="/">Vegan Recipe Zine</Link>
        </h1>
        <nav className="nav">
          <ul className="nav-list">
            <li><NavLink exact className="nav-link" to="/">Home</NavLink></li>
            <li><NavLink className="nav-link" to="/add-recipe">Add Recipe</NavLink></li>
          </ul>
        </nav>
      </header>

  )
}

export default Header

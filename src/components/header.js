import React from 'react';
import '../css/header.css';
import { Link, NavLink } from "react-router-dom";

function Header(props) {
  return (
      <header className="header">
           <picture>
             <source type="image/webp" media="(max-width: 575px)" srcSet="https://ik.imagekit.io/7lgsnfz7v5/v0/b/vegan-recipe-zine.appspot.com/o/images%2Fnadine-primeau-unsplash.jpg?alt=media&token=64812979-8453-470a-b928-360f95f1733c?tr=w-575" />
             <source type="image/webp" media="(min-width: 576px)" srcSet="https://ik.imagekit.io/7lgsnfz7v5/v0/b/vegan-recipe-zine.appspot.com/o/images%2Fnadine-primeau-unsplash.jpg?alt=media&token=64812979-8453-470a-b928-360f95f1733c?tr=w-767" />
             <source type="image/webp" media="(min-width: 768px)" srcSet="https://ik.imagekit.io/7lgsnfz7v5/v0/b/vegan-recipe-zine.appspot.com/o/images%2Fnadine-primeau-unsplash.jpg?alt=media&token=64812979-8453-470a-b928-360f95f1733c?tr=w-991" />
             <source type="image/webp" media="(min-width: 992px)" srcSet="https://ik.imagekit.io/7lgsnfz7v5/v0/b/vegan-recipe-zine.appspot.com/o/images%2Fnadine-primeau-unsplash.jpg?alt=media&token=64812979-8453-470a-b928-360f95f1733c?tr=w-1199" />
             <source type="image/webp" media="(min-width: 1200px)" srcSet="https://ik.imagekit.io/7lgsnfz7v5/v0/b/vegan-recipe-zine.appspot.com/o/images%2Fnadine-primeau-unsplash.jpg?alt=media&token=64812979-8453-470a-b928-360f95f1733c?tr=w-1499" />
             <source type="image/webp" media="(min-width: 1500px)" srcSet="https://ik.imagekit.io/7lgsnfz7v5/v0/b/vegan-recipe-zine.appspot.com/o/images%2Fnadine-primeau-unsplash.jpg?alt=media&token=64812979-8453-470a-b928-360f95f1733c?tr=w-2000" />
             <img className="header-image" src="https://ik.imagekit.io/7lgsnfz7v5/v0/b/vegan-recipe-zine.appspot.com/o/images%2Fnadine-primeau-unsplash.jpg" alt="" />
           </picture>
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

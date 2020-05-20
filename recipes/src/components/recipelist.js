import React from 'react';
import { Link } from "react-router-dom";

function RecipeList (props) {
  return (
    <section>
      <ul>
      {props.recipes.map((recipe) => {
        return (
          <li key={recipe.id}>
            <article>
              <header>
                <h2><Link to={`/recipe/${recipe.recipeTitle}?recipeId=${recipe.id}`} >{recipe.recipeTitle}</Link></h2>
              </header>
              <p>Servings: {recipe.servings}</p>
            </article>
          </li>
        )
      })}
      </ul>
    </section>
  )
}

export default RecipeList;

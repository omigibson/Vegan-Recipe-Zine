import React from 'react';
import { Link } from "react-router-dom";
import firebase from '../firebase.js';
import '../css/recipelist.css';

class RecipeList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: []
    }
  }

  componentDidMount(){
    const recipesRef = firebase.database().ref('recipes')
    recipesRef.once('value', (snapshot) => {
      let recipes = snapshot.val()
      let newState = []
      for (let recipe in recipes) {
        newState.push({
          id: recipe,
          recipeTitle: recipes[recipe].title,
          servings: recipes[recipe].servings,
          ingredientsList: recipes[recipe].ingredients,
          instructions: recipes[recipe].instructions
        });
      }
      this.setState({
        recipes: newState
      });
    })
  }
  render(){
    return (
      <section className="recipe-list-container">
        <ul className="recipe-list">
        {this.state.recipes.map((recipe) => {
          return (
            <li key={recipe.id} className="recipe-list-item">
              <article>
                <header>
                  <h2><Link className="recipe-list-link" to={`/recipe/${recipe.recipeTitle}?recipeId=${recipe.id}`} >{recipe.recipeTitle}</Link></h2>
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
}

export default RecipeList;

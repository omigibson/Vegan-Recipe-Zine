import React from 'react';
import firebase from '../firebase.js';

class Recipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe: []
    }
  }

componentDidMount(){
  let params = new URLSearchParams(document.location.search.substring(1))
  let id = params.get("recipeId")
  const recipeRef = firebase.database().ref('recipes/' + id)
  recipeRef.once('value', (snapshot) => {
    let recipe = snapshot.val()
    let newState = []
    newState.push({
      id: id,
      title: recipe.title,
      servings: recipe.servings,
      ingredientsList: recipe.ingredients,
      instructions: recipe.instructions
    });
    this.setState({
      recipe: newState
    });
  })
}
  render(){
    return (
        <article className="">
          <header>
            <h2>{this.state.recipe[0] ? this.state.recipe[0].title : '' }</h2>
          </header>
  {/*
          <ul>
          {recipe.ingredientsList.map((ingredient) => {
            return (
              <li>{ingredient.amount} {ingredient.unit} {ingredient.ingredient}</li>
            )
          })}
          </ul>
          <p>{recipe.instructions}</p>
      */  }
        </article>
    )
  }
}

export default Recipe

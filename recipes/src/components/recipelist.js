import React from 'react';
import firebase from '../firebase.js';

class RecipeList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: []
    }
  }

componentDidMount(){
  const recipesRef = firebase.database().ref('recipes')
  recipesRef.on('value', (snapshot) => {
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
      <section>
        <ul>
        {this.state.recipes.map((recipe) => {
          return (
            <li key={recipe.id}>
              <article>
                <header>
                  <h2>{recipe.recipeTitle}</h2>
                </header>
                <p>Servings: {recipe.servings}</p>
                <ul>
                {recipe.ingredientsList.map((ingredient) => {
                  return (
                    <li>{ingredient.amount} {ingredient.unit} {ingredient.ingredient}</li>
                  )
                })}
                </ul>
                <p>{recipe.instructions}</p>
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

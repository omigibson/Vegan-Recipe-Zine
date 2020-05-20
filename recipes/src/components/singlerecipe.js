import React from 'react';

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
  let recipeData = this.props.getRecipeData(id)
  this.setState({
    recipe: recipeData
  })
  console.log(id)
}
  render(){
    return (
        <article className="">
          <header>
            <h2>Single Recipe!</h2>
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

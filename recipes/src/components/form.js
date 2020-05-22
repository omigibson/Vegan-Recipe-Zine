import React from 'react';
import firebase from '../firebase.js';
import Ingredient from './formingredient';

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipeTitle: '',
      servings: '',
      ingredientsList: [{amount: 0, unit: '', ingredient: ''},],
      instructions: ''
    }
  }

  handleInput = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleAddIngredient = () => {
    this.setState({
      ingredientsList: [...this.state.ingredientsList, {amount: 0, unit: '', ingredient: ''}]
    })
  }

  handleIngredientInput = (event, index) => {
    if (this.state.ingredientsList.length === 0){
      let list = this.state.ingredientsList.concat({[event.target.name]: event.target.value });
      this.setState({
        ingredientsList: list
      })
    }
    else {
      let list = this.state.ingredientsList.map((item, i) => {
        if (i === index) {
          item = {
            ...item,
            [event.target.name]: event.target.value
          }
          return item
        }
        else {
          return item
        }
      })
      this.setState({
        ingredientsList: list
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let jsonRecipe = JSON.stringify(this.state)
    alert(`You have submitted: ${this.state.recipeTitle}`)
    console.log(jsonRecipe)

    const recipesRef = firebase.database().ref('recipes')
    const recipe = {
    title: this.state.recipeTitle,
    servings: this.state.servings,
    ingredients: this.state.ingredientsList,
    instructions: this.state.instructions
  }

  recipesRef.push(recipe)
  this.setState({
    recipeTitle: '',
    servings: '',
    ingredientsList: [{amount: 0, unit: '', ingredient: ''},],
    instructions: ''
  })
    console.log('DATA SAVED');
  }

  render() {
    let ingredients = this.state.ingredientsList.map((ingredient, index) => (
      <li key={index}><Ingredient index={index} onInput={this.handleIngredientInput} input={this.state.ingredientsList[index]} /></li>
      )
    )
    return (
      <div>
        <h2>Add a new recipe</h2>
        <form id="addRecipeForm" onSubmit={this.handleSubmit}>

          <label htmlFor="recipeTitle">Title</label>
          <input id="recipeTitle" type="text" value={this.state.recipeTitle} onChange={(e) => this.handleInput(e)} />

          <label htmlFor="image">Servings</label>
          <input id="servings" type="number" value={this.state.servings} onChange={(e) => this.handleInput(e)} />

          <h3>Ingredients:</h3>
          <button type="button" onClick={this.handleAddIngredient}>Add ingredient</button>
          <ul>{ingredients}</ul>

          <h3>Instructions:</h3>
          <label htmlFor="instructions">Instructions</label>
          <textarea id="instructions" value={this.state.instructions} onChange={(e) => this.handleInput(e)} placeholder="Write instructions on how to prepare the meal here"/>

          <button type="submit" form="addRecipeForm">Save recipe</button>

        </form>
      </div>
    );
  }
}

export default Form;

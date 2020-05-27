import React from 'react';
import firebase from '../firebase.js';
import * as firebaseui from 'firebaseui'
import '../css/form.css';
import Ingredient from './formingredient';

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedInUser: '',
      recipeTitle: '',
      servings: '',
      image: '',
      ingredientsList: [{amount: 0, unit: '', ingredient: ''},],
      instructions: ''
    }
    this.imageInput = React.createRef();
  }

  handleInput = (event) => {
    if (event.id === 'image'){
      this.setState({
        [event.target.id]: this.imageInput.current.files[0].name
      })
    }
    else {
      this.setState({
        [event.target.id]: event.target.value
      })
    }
  }

  handleAddIngredientFields = () => {
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
    const recipesRef = firebase.database().ref('recipes')

    const recipe = {
    title: this.state.recipeTitle,
    servings: this.state.servings,
    image: this.state.image,
    ingredients: this.state.ingredientsList,
    instructions: this.state.instructions
  }

  recipesRef.push(recipe)

  //IMAGE
  const storageRef = firebase.storage().ref('images');
  const image = document.getElementById('image').files[0];
  console.log(image)
  var uploadTask = storageRef.child(image.name).put(image)

  // Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/unauthorized':
    console.log(`User doesn't have permission to access the object`)
      break;

    case 'storage/canceled':
      console.log('User canceled the upload')
      break;

    case 'storage/unknown':
      console.log('Unknown error occurred, inspect error.serverResponse')
      break;
      default:
      console.log('Somte other error')

  }
}, function() {
  // Upload completed successfully, now we can get the download URL
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);
  });
});

  //CLEAR STATE
  this.setState({
    recipeTitle: '',
    servings: '',
    description: '',
    image: '',
    ingredientsList: [{amount: 0, unit: '', ingredient: ''},],
    instructions: ''
  })
    console.log('DATA SAVED');
    alert(`You have submitted: ${this.state.recipeTitle}`)
  }

  // componentDidMount = () => {
  //   var provider = new firebase.auth.FacebookAuthProvider();
  //   firebase.auth().signInWithRedirect(provider);
  // }

  render() {
    //Create array of ingredients
    let ingredients = this.state.ingredientsList.map((ingredient, index) => (
      <li key={index}><Ingredient index={index} onInput={this.handleIngredientInput} input={this.state.ingredientsList[index]} /></li>
      )
    )
    return (
      <div className="form-wrapper">
        <h2 className="form-heading">Add a new recipe</h2>
        <form id="addRecipeForm" onSubmit={this.handleSubmit}>
          <div class="form-recipe-info">
            <label htmlFor="recipeTitle">Title:</label>
            <input id="recipeTitle" type="text" required value={this.state.recipeTitle} onChange={(e) => this.handleInput(e)} />
          </div>
          <div class="form-recipe-info">
            <label htmlFor="servings">Servings:</label>
            <input id="servings" type="number" value={this.state.servings} onChange={(e) => this.handleInput(e)} />
          </div>
          <div class="form-recipe-info">
            <label htmlFor="description">Description:</label>
            <textarea id="description" rows="4" value={this.state.description} onChange={(e) => this.handleInput(e)} placeholder="Write a short description of this recipe"/>
          </div>
          <div class="form-recipe-info">
            <label htmlFor="servings">Image:</label>
            <input id="image" type="file" ref={this.imageInput} onChange={(e) => this.handleInput(e)} />
          </div>
          <div className="form-ingredients-wrapper">
            <h3>Ingredients</h3>
            <button type="button" onClick={this.handleAddIngredientFields}>Add ingredient</button>
            <ul className="form-ingredients-list">{ingredients}</ul>
          </div>
          <div className="form-recipe-instructions">
            <h3 id="instructions-heading">Instructions</h3>
            <textarea id="instructions" aria-labelledby="instructions-heading" rows="14" required value={this.state.instructions} onChange={(e) => this.handleInput(e)} placeholder="Write instructions on how to prepare the meal here"/>
          </div>
          <div className="submit-wrapper">
             <button type="submit" form="addRecipeForm">Save recipe</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;

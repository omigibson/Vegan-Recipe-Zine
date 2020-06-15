import React from 'react';
import firebase from '../firebase.js';
import '../css/form.css';

//COMPONENTS
import SignIn from './signin';
import Ingredient from './formingredient';
import Button from './button';

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      recipeTitle: '',
      servings: '',
      description: '',
      image: '',
      ingredientsList: [{amount: 0, unit: '', ingredient: ''},],
      instructions: '',
      formErrors: [],
    }
    this.imageInput = React.createRef();
  }

  componentDidMount = () => {
     // If user is signed in, save email in state
      firebase.auth().onAuthStateChanged(user => {
         if (user) {
            this.setState({ user: user.email});
         }
      });
  }

  handleSignIn = () => {
     // Sign in with Google
     var provider = new firebase.auth.GoogleAuthProvider();
     firebase.auth().signInWithRedirect(provider);
 }


// All user input, except from the Ingredient component
  handleInput = (event) => {
    if (event.id === 'image'){
      this.setState({
        [event.target.id]: this.imageInput.current.files[0].name
      })
   }
   else if (this.state.formErrors.length > 0) {
      this.setState({
         [event.target.id]: event.target.value,
         formErrors: this.state.formErrors.filter(error => error !== event.target.id )
     })
   }
    else {
      this.setState({
        [event.target.id]: event.target.value
      })
    }
  }

// Adds fields when user clicks 'Add Ingredient' button
  handleAddIngredientFields = () => {
    this.setState({
      ingredientsList: [...this.state.ingredientsList, {amount: 0, unit: '', ingredient: ''}]
    })
  }

// User input from the Ingredient component
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

  handleRemoveIngredient = (removeIndex) => {
     let ingredientToRemove = this.state.ingredientsList[removeIndex]
     this.setState(prevState => ({
        ingredientsList: prevState.ingredientsList.filter(ingredient => ingredient !== ingredientToRemove )
     }));
 }

  handleSubmit = (event) => {
     //First, check if user is signed in
     if (!this.state.user){
        alert('You need to sign in in order to submit a new recipe')
     }
     //Next, check if all mandatory fields are filled in
     else if(this.state.recipeTitle.length === 0 || this.state.instructions.length === 0){
        let fields = []
        if (this.state.recipeTitle.length === 0){
           fields.push('recipeTitle')
        }
        if (this.state.instructions.length === 0){
           fields.push('instructions')
        }
        this.setState({
           formErrors: fields
        })
        alert('You need to fill in all mandatory fields in order to submit a new recipe')
     }
     else {
     event.preventDefault();
     // Database reference
     const recipesRef = firebase.database().ref('recipes')
     // Object to submit to database
     const recipe = {
        user: this.state.user,
        title: this.state.recipeTitle,
        servings: this.state.servings,
        description: this.state.description,
        image: this.state.image,
        ingredients: this.state.ingredientsList,
        instructions: this.state.instructions
     }
     // Push recipe object to database
     recipesRef.push(recipe, () => {
        alert(`You have submitted: ${this.state.recipeTitle}`)
        // Clear local state after saving recipe
        this.setState({
           user: '',
           recipeTitle: '',
           servings: '',
           description: '',
           image: '',
           ingredientsList: [{amount: 0, unit: '', ingredient: ''},],
           instructions: '',
           formErrors: []
        })
        // firebase.auth().signOut()
     })
     //  If the recipe has an image, handle the image
     if (document.getElementById('image').files[0]){
        // Storage reference
        const storageRef = firebase.storage().ref('images');
        // Get image from input field
        const image = document.getElementById('image').files[0];
        // Upload image to storage
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
              default:
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
            console.log('Something went wrong')
        }
      }, function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
        });
      });
   }
  }
}

  render() {
    return (
      <div>
         <SignIn user={this.state.user} handleSignIn={this.handleSignIn} />
         <h2 className="form-heading">Add a new recipe</h2>
         <form id="addRecipeForm">
            <div className="form-recipe-info">
               <label htmlFor="recipeTitle">Title:</label>
               <input
                  id="recipeTitle"
                  className={this.state.formErrors.includes('recipeTitle') ? 'invalid' : '' }
                  type="text"
                  value={this.state.recipeTitle}
                  onChange={(e) => this.handleInput(e)}
                  aria-required="true"
                  aria-invalid={this.state.formErrors.includes('recipeTitle') ? true : false}
               />
           </div>
           <div className="form-recipe-info">
             <label htmlFor="servings">Servings:</label>
             <input id="servings" type="number" value={this.state.servings} onChange={(e) => this.handleInput(e)} />
          </div>
          <div className="form-recipe-info">
             <label htmlFor="description">Description:</label>
             <textarea id="description" rows="4" value={this.state.description} onChange={(e) => this.handleInput(e)} placeholder="Write a short description of this recipe"/>
          </div>
          <div className="form-recipe-info">
             <label htmlFor="image">Image:</label>
             <input id="image" type="file" ref={this.imageInput} onChange={(e) => this.handleInput(e)} />
          </div>
          <div className="form-ingredients-wrapper">
            <h3>Ingredients</h3>
            <Button cls="add-ingredient-button" onClick={this.handleAddIngredientFields} buttonText="Add Ingredient" />
            <ul className="form-ingredients-list">
               { this.state.ingredientsList.map((ingredient, index) => (
                     <li key={index}>
                        <Ingredient index={index} onInput={this.handleIngredientInput} input={this.state.ingredientsList[index]} onRemoveClick={this.handleRemoveIngredient} />
                     </li>
                  )) }
            </ul>
          </div>
          <div className="form-recipe-instructions">
            <h3 id="instructions-heading">Instructions</h3>
            <textarea
               id="instructions"
               className={this.state.formErrors.includes('instructions') ? 'invalid' : '' }
               aria-labelledby="instructions-heading"
               rows="14"
               value={this.state.instructions}
               aria-required="true"
               aria-invalid={this.state.formErrors.includes('instructions') ? true : false}
               onChange={(e) => this.handleInput(e)} placeholder="Write instructions on how to prepare the meal here"/>
          </div>
          <div className="submit-wrapper">
             <Button onClick={this.handleSubmit} buttonText="Save Recipe" />
          </div>
        </form>
      </div>
    );
  }
}

export default Form;

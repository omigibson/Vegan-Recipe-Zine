import React from 'react';
import Button from './button';
import { Link } from "react-router-dom";
import firebase from '../firebase.js';
import '../css/recipelist.css';

class RecipeList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
      paginationIndex: '',
      fetchedAllRecipes: false
    }
  }

  componentDidMount(){
    this.getRecipes('')
  }

  getRecipes = () => {
     const recipesRef = firebase.database().ref('recipes')
     const imagesRef = firebase.storage().ref('images')
     recipesRef.orderByKey().startAt(this.state.paginationIndex).limitToFirst(4).on('value', (snapshot) => {
        let recipes = snapshot.val()
        let newState = [...this.state.recipes]
        // loop through recipes from the database
        for (let recipe in recipes) {
           let imageName = '';
           // If the recipe has an image, set imageName to that image
           if (recipes[recipe].image){
             imageName = recipes[recipe].image.replace('C:\\fakepath\\', '')
          }
          else {
             // If the recipe has no image, set imageName to default image
             imageName = 'chang-qing-unsplash.jpg'
          }
          // Get recipe image or default iamge from Firebase Storage
          imagesRef.child(imageName).getDownloadURL().then( (url) => {
             newState.push({
               id: recipe,
               recipeTitle: recipes[recipe].title,
               servings: recipes[recipe].servings,
               description: recipes[recipe].description,
               image: recipes[recipe].image,
               imageUrl: url,
               ingredientsList: recipes[recipe].ingredients,
               instructions: recipes[recipe].instructions
             });
             //Sort recipes in age order
             newState.sort((a,b) => {
               if ( a.id < b.id ){
                  return -1;
                 }
                 if ( a.id > b.id ){
                  return 1;
                 }
                 return 0;
             })
             let paginationIndex = newState[newState.length - 1].id
             let filteredRecipes = []
             if (Object.keys(recipes).length < 4 && recipe === paginationIndex){
                filteredRecipes = newState
             }
             else {
                filteredRecipes = newState.filter(recipe => recipe.id !== paginationIndex)
             }
             this.setState({
               paginationIndex: paginationIndex,
               recipes: filteredRecipes,
               fetchedAllRecipes: Object.keys(recipes).length < 4 ? true : false
             });
          })
       }
    })
 }

  render(){
    return (
      <div>
        <ul className="recipe-list">
        {this.state.recipes.map((recipe) => {
          return (
            <li key={recipe.id} className="recipe-list-item">
              <article>
                 <Link className="recipe-list-link" to={`/recipe/${recipe.recipeTitle}?recipeId=${recipe.id}`} >
                    { recipe.imageUrl &&
                       <img alt={recipe.title} src={recipe.imageUrl} className="recipe-list-image"/>
                    }
                   <header className="recipe-list-item-text">
                      <h2>{recipe.recipeTitle}</h2>
                   </header>
                   { recipe.servings &&
                      <p className="recipe-list-item-text">Servings: {recipe.servings}</p>
                   }
                   { recipe.description &&
                      <p className="recipe-list-item-text">{recipe.description}</p>
                   }
                </Link>
              </article>
            </li>
          )
        })}
        </ul>
        { !this.state.fetchedAllRecipes &&
           <Button cls="load-more" onClick={this.getRecipes} buttonText="More Recipes" />
        }
     </div>
    )
  }
}

export default RecipeList;

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
     // Create database and storage references
     const recipesRef = firebase.database().ref('recipes')
     const imagesRef = firebase.storage().ref('images')

     // Ger 9 recipes starting at paginationIndex
     recipesRef.orderByKey().startAt(this.state.paginationIndex).limitToFirst(9).on('value', (snapshot) => {
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
          // Get recipe image or default iamge from storage
          imagesRef.child(imageName).getDownloadURL().then( (url) => {
             url = url.replace('https://firebasestorage.googleapis.com', ' https://ik.imagekit.io/7lgsnfz7v5')
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
             // Sort recipes in age order
             newState.sort((a,b) => {
               if ( a.id < b.id ){
                  return -1;
                 }
                 if ( a.id > b.id ){
                  return 1;
                 }
                 return 0;
             })
             // Create paginationIndex to reference when getting more recipes from the database
             let paginationIndex = newState[newState.length - 1].id
             let filteredRecipes = []
             // If all recipes are fetched, set all of them to filteredRecipes
             if (Object.keys(recipes).length < 9){
                filteredRecipes = newState
             }
             // if there are still more recipes in the database, filter out the paginationIndex recipe
             else {
                filteredRecipes = newState.filter(recipe => recipe.id !== paginationIndex)
             }
             this.setState({
               paginationIndex: paginationIndex,
               recipes: filteredRecipes,
               fetchedAllRecipes: Object.keys(recipes).length < 9 ? true : false
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
                       <picture>
                          <source type="image/webp" media="(max-width: 575px)" srcSet={`${recipe.imageUrl}?tr=h-350`} />
                          <source type="image/webp" media="(min-width: 576px)" srcSet={`${recipe.imageUrl}?tr=h-149`} />
                          <source type="image/webp" media="(min-width: 768px)" srcSet={`${recipe.imageUrl}?tr=h-202`} />
                          <source type="image/webp" media="(min-width: 992px)" srcSet={`${recipe.imageUrl}?tr=h-180`} />
                          <source type="image/webp" media="(min-width: 1200px)" srcSet={`${recipe.imageUrl}?tr=h-220`} />
                          <img className="recipe-list-image" src={recipe.imageUrl} alt={recipe.recipeTitle} />
                       </picture>
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

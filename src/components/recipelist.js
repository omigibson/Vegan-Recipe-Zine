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
    const imagesRef = firebase.storage().ref('images')
    recipesRef.once('value', (snapshot) => {
      let recipes = snapshot.val()
      let newState = []
      for (let recipe in recipes) {
         if (recipes[recipe].image){
            console.log('Recipe has image: ' + recipes[recipe].image)
            let imageName = recipes[recipe].image.replace('C:\\fakepath\\', '')
            console.log('image name has been fixed: ' + imageName)
            imagesRef.child(imageName).getDownloadURL().then( (url) => {
               console.log('DownloadURL fetched')
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
               this.setState({
                 recipes: newState
               });
            })
         }
         else {
            newState.push({
              id: recipe,
              recipeTitle: recipes[recipe].title,
              servings: recipes[recipe].servings,
              description: recipes[recipe].description,
              image: recipes[recipe].image,
              ingredientsList: recipes[recipe].ingredients,
              instructions: recipes[recipe].instructions
            });
            this.setState({
              recipes: newState
            });
         }
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
     </div>
    )
  }
}

export default RecipeList;

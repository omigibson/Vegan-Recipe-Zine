import React from 'react';
import firebase from '../firebase.js';
import '../css/singlerecipe.css';

class Recipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

componentDidMount(){
   let params = new URLSearchParams(document.location.search.substring(1))
   let id = params.get("recipeId")
   const recipeRef = firebase.database().ref('recipes/' + id)
   recipeRef.once('value', (snapshot) => {
      let recipe = snapshot.val()
      this.setState({
         id: id,
         title: recipe.title,
         servings: recipe.servings,
         description: recipe.description,
         image: recipe.image.replace('C:\\fakepath\\', ''),
         ingredientsList: recipe.ingredients,
         instructions: recipe.instructions
      }, () => {
            const imageRef = firebase.storage().ref(`images/${this.state.image}`)
            imageRef.getDownloadURL().then( (url) => {
               url = url.replace('https://firebasestorage.googleapis.com', ' https://ik.imagekit.io/7lgsnfz7v5')
               this.setState({
                  imageUrl: url
               })
            })
      });
   })
}

  render(){
    return (
        <article className="single-recipe">
          <header>
            <h2 className="single-recipe-header">{this.state.title ? this.state.title : '' }</h2>
          </header>
          { this.state.imageUrl &&
             <picture>
                <source type="image/webp" media="(max-width: 575px)" srcSet={`${this.state.imageUrl}?tr=w-463`} />
                <source type="image/webp" media="(min-width: 576px)" srcSet={`${this.state.imageUrl}?tr=w-655`} />
                <source type="image/webp" media="(min-width: 768px)" srcSet={`${this.state.imageUrl}?tr=w-847`} />
                <source type="image/webp" media="(min-width: 992px)" srcSet={`${this.state.imageUrl}?tr=w-991`} />
                <source type="image/webp" media="(min-width: 1200px)" srcSet={`${this.state.imageUrl}?tr=w-1158`} />
                <img className="single-recipe-image" src={this.state.imageUrl} alt={this.state.recipeTitle}/>
             </picture>
          }
          <p>{this.state.description}</p>
          { this.state.servings &&
             <p>Servings: {this.state.servings}</p>
          }
          { this.state.ingredientsList &&
             <section>
                <h3 className="single-recipe-header">Ingredients</h3>
                <ul>
                   {this.state.ingredientsList.map((ingredient, index) => {
                    return (
                      <li key={index} className="single-recipe-ingredient">{ingredient.amount} {ingredient.unit} {ingredient.ingredient}</li>
                    )
                  })}
                </ul>
             </section>
          }
          <section>
             <h3 className="single-recipe-header">Instructions</h3>
             <p className="single-recipe-instructions">{this.state.instructions}</p>
          </section>
        </article>
    )
  }
}

export default Recipe

import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import firebase from './firebase.js';
import * as serviceWorker from './serviceWorker';

// COMPONENTS
import Header from './components/header.js';
import RecipeList from './components/recipelist.js';
import Recipe from './components/singlerecipe.js';
import Form from './components/form.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: []
    }
  }

  getCurrentRecipe = (id) => {
    console.log(`Index js state: ${this.state.recipes}`)
    return this.state.recipes[id]
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
      <React.StrictMode>
        <Router>
          <Header />
          <Switch>
            <Route path="/recipe/:id" render={() => <Recipe getRecipeData={() => this.getCurrentRecipe()}  />} ></Route>
            <Route path="/add-recipe" component={Form}></Route>
            <Route exact path="/" render={() => <RecipeList recipes={this.state.recipes} />} ></Route>
          </Switch>
        </Router>
      </React.StrictMode>
    )
  }
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

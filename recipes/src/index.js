import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Header from './components/header.js';
import RecipeList from './components/recipelist.js';
import Form from './components/form.js';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

const routing = (
  <React.StrictMode>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={RecipeList}></Route>
        <Route path="/add-recipe" component={Form}></Route>
      </Switch>
    </Router>
  </React.StrictMode>
)

ReactDOM.render(
    routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

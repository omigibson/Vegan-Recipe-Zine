import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

// COMPONENTS
import Header from './components/header';
import RecipeList from './components/recipelist';
import Recipe from './components/singlerecipe';
import Form from './components/form';
import Footer from './components/footer'

function App (props) {
  return (
    <React.StrictMode>
      <Router>
        <Header />
        <main>
           <Switch>
             <Route path="/recipe/:id" component={Recipe} ></Route>
             <Route path="/add-recipe" component={Form}></Route>
             <Route exact path="/" component={RecipeList} ></Route>
           </Switch>
        </main>
        <Footer />
      </Router>
    </React.StrictMode>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

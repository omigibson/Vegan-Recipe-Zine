import React from 'react';
import './App.css';
import Header from './components/header.js';
import Form from './components/form.js';
import RecipeList from './components/recipelist.js';

function App() {
  return (
      <div className="App">
        <Header />
        <RecipeList />
        <Form />
      </div>
  );
}

export default App;

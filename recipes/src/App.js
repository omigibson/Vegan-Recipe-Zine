import React from 'react';
import './App.css';
import Form from './components/form.js';
import RecipeList from './components/recipelist.js';

function App() {
  return (
      <div className="App">
      <RecipeList/>
        <Form/>
      </div>
  );
}

export default App;

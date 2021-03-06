import React from 'react';
import Button from './button';

function Ingredient(props) {
  return (
    <fieldset aria-label={`Ingredient ${props.index + 1}`}>
      <span className="form-ingredient-index" aria-hidden="true">{props.index + 1}.</span>
      <div className="form-ingredient-info">
         <label htmlFor={`${props.index}-amount`}>Amount</label>
         <input id={`${props.index}-amount`} type="number" step=".01" name="amount" value={props.input ? props.input.amount : ''} onChange={(e) => props.onInput(e, props.index)} />
      </div>
      <div className="form-ingredient-info">
         <label htmlFor={`${props.index}-unit`}>Unit</label>
         <select id={`${props.index}-unit`} name="unit" value={props.input ? props.input.unit : ''} onChange={(e) => props.onInput(e, props.index)}>
           <option></option>
           <option>cup</option>
           <option>tablespoon</option>
           <option>teaspoon</option>
         </select>
      </div>
      <div className="form-ingredient-info">
         <label htmlFor={`${props.index}-ingredient`}>Ingredient</label>
         <input id={`${props.index}-ingredient`} name="ingredient" type="text" value={props.input ? props.input.ingredient : ''} onChange={(e) => props.onInput(e,props.index)} />
      </div>
      <Button cls="remove-ingredient" ariaLabel="Remove" buttonText="X" onClick={ () => props.onRemoveClick(props.index) } />
    </fieldset>
  );
}

export default Ingredient;

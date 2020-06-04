import React from 'react';

function Ingredient(props) {
  return (
    <fieldset>
      <span className="form-ingredient-index">{props.index + 1}.</span>
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
    </fieldset>
  );
}

export default Ingredient;

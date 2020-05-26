import React from 'react';

function Ingredient(props) {
  return (
    <fieldset>

      <label htmlFor={`${props.index}-amount`}>Amount</label>
      <input id={`${props.index}-amount`} type="number" step=".01" name="amount" value={props.input ? props.input.amount : 0} onChange={(e) => props.onInput(e, props.index)} />

      <label htmlFor={`${props.index}-unit`}>Unit</label>
      <select id={`${props.index}-unit`} name="unit" value={props.input ? props.input.unit : ''} onChange={(e) => props.onInput(e, props.index)}>
        <option></option>
        <option>Cup</option>
        <option>Tablespoon</option>
        <option>Teaspoon</option>
      </select>

      <label htmlFor={`${props.index}-ingredient`}>Ingredient</label>
      <input id={`${props.index}-ingredient`} name="ingredient" type="text" value={props.input ? props.input.ingredient : ''} onChange={(e) => props.onInput(e,props.index)} />

    </fieldset>
  );
}

export default Ingredient;

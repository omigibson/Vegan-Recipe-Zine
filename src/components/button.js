import React from 'react'

function Button (props) {
   return (
      <button type="button" className={props.cls} aria-label={props.ariaLabel} onClick={props.onClick}>{props.buttonText}</button>
   )
}

export default Button

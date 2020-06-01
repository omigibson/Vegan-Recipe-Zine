import React from 'react';

function SignIn(props) {
   if (props.user){
      return <p>Signed in with {props.user} via Google</p>
    }
   return (
      <div>
         <p>You need to sign in to add a new recipe.</p>
         <button onClick={props.handleSignIn}>Sign in with Google</button>
      </div>
   )
}

export default SignIn;

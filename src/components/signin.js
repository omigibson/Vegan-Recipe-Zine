import React from 'react';

function SignIn(props) {
   if (props.user){
      return (
         <div className="signed-in-info">
            <p>Signed in with {props.user} via Google</p>
            <p>If you submit a recipe your email address will be saved in the database.</p>
         </div>
      )
    }
   return (
      <div>
         <p>You need to sign in in order to submit a new recipe.</p>
         <button onClick={props.handleSignIn}>Sign in with Google</button>
      </div>
   )
}

export default SignIn;

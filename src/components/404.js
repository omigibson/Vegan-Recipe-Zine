import React from 'react';
import '../css/404.css';

function PageNotFound(props) {
   return (
      <div class="not-found">
         <h2 class="error">404</h2>
         <h3>Page Not Found</h3>
         <p>Please check the URL for mistakes and try again.</p>
      </div>
  )
}

export default PageNotFound

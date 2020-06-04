import React from 'react';
import LinkedInLogo from '../images/LinkedIn.png';
import GitHubLogo from '../images/GitHub-64px.png';
import '../css/footer.css';

function Footer(props) {
   return (
      <footer className="footer">
         <p>Site made by Omi Gibba in spring 2020</p>
         <div>
            <a href="https://www.linkedin.com/in/omi-gibba">
               <img src={LinkedInLogo} alt="LinkedIn" className="footer-link" />
            </a>
            <a href="https://github.com/omigibson/Vegan-Recipe-Zine">
               <img src={GitHubLogo} alt="GitHub" className="footer-link" />
            </a>
         </div>
      </footer>
  )
}

export default Footer

import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className='footer'>
      <p>&copy; 2024 Dog Info Hub</p>
      <div className='social-links'>
        <a href="https://github.com/reesegreen2014" target="_blank" alt='github logo' rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
        <a href="https://www.linkedin.com/in/reese-green" target="_blank" alt='LinkedIn Logo' rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;

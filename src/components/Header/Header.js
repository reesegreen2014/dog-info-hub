import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-link">Dog Info Hub <span className='paw-print'>🐾</span></Link>
      </div>
      <nav>
        <Link to="/favorites" className="nav-button">My Favorites</Link>
        <Link to="/all-breeds" className="nav-button">All Breeds</Link>
        <Link to="/resources" className="nav-button">Owner Resources</Link>
      </nav>
    </header>
  );
};

export default Header;

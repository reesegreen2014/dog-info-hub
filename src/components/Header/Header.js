import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleMenu = () => {
    if (menuOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setMenuOpen(false);
        setIsAnimating(false);
      }, 500);
    } else {
      setMenuOpen(true);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-link">Dog Info Hub <span className='paw-print'>🐾</span></Link>
      </div>
      <nav className={`nav ${menuOpen ? 'open' : ''} ${isAnimating ? 'close' : ''}`}>
        <Link to="/" className="nav-button" onClick={toggleMenu}>Home</Link>
        <Link to="/all-breeds" className="nav-button" onClick={toggleMenu}>All Breeds</Link> 
        <Link to="/favorites" className="nav-button myfavorites" onClick={toggleMenu}>My Favorites</Link>
        <Link to="/resources" className="nav-button" onClick={toggleMenu}>Owner Resources</Link>
      </nav>
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
    </header>
  );
};

export default Header;

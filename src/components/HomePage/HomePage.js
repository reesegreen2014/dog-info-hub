import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className='home-page'>
      <h1 className='home-page-header'>Dog Info Hub</h1>
      <div className='info-box'>
        <p>Welcome to Dog Info Hub – the ultimate guide for finding your perfect four-legged friend! 🐶 Whether you're an energetic adventurer or a homebody looking for a couch companion, our app helps you discover the best dog breed for your lifestyle. Take our quick quiz to get matched with breeds that fit your preferences, explore detailed profiles of each breed, and save your favorites for easy reference. Let's make finding your new best friend a fun and easy experience!</p>
      </div>
      <div className='button-container'>
        <Link to='/quiz' className='home-button'>Take The Quiz!</Link>
        <Link to='/all-breeds' className='home-button'>Explore All Breeds</Link>
      </div>
    </div>
  )
}

export default HomePage

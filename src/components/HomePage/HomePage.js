import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className='home-page'>
      <h1 className='home-page-header'>Dog Info Hub </h1>
      <div className='info-box'>
        <p><strong>Welcome to Dog Info Hub – your go-to guide for discovering everything about your future four-legged friend! 🐶 </strong></p>
        <p><strong>Whether you're an energetic adventurer or a homebody looking for a couch companion, our app helps you find the best dog breed to fit your lifestyle. Search for breeds by name, apply filters to find the perfect match, and explore detailed profiles of each breed. Don't forget to check out our "Owners Resource" page for some fun and informative articles.</strong></p>
        <p><strong>Let's make finding your new best friend a fun and easy experience!</strong></p>
      </div>
      <div className='button-container'>
        <Link to='/all-breeds' className='home-button'>Explore All Breeds</Link>
      </div>
    </div>
  )
}

export default HomePage

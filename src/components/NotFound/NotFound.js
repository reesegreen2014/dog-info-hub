import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';
import lost from '../../images/Lost Dog.jpg';

const NotFound = () => {
  return (
    <div className="not-found-container">
        <img src={lost} alt='lost dog in field'></img>
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default NotFound;
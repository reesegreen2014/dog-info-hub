import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllBreeds } from '../../ApiCalls/apiCalls';
import './AllBreeds.css';

function AllBreeds() {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    fetchAllBreeds().then(data => {
      console.log('Fetched Breeds:', data);
      setBreeds(data);
    });
  }, []);

  return (
    <div className='all-breeds-container'>
      <h1>All Breeds</h1>
      <div className='breeds-grid'>
        {breeds.map((breed) => (
          <Link to={`/breed/${breed.id}`} key={breed.id} className='breed-card-link'>
            <div className='breed-card'>
              {breed.reference_image_id && (
                <img src={`https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`} alt={breed.name} />
              )}
              <h2>{breed.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllBreeds;

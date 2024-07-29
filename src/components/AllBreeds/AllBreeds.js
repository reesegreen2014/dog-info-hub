import React, { useEffect, useState } from 'react';
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
          <div className='breed-card' key={breed.id}>
            {breed.reference_image_id && <img src={`https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`} alt={breed.name} />}
            <h2>{breed.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllBreeds;

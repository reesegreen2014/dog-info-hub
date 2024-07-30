import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { getFavoritesFromLocalStorage, saveFavoritesToLocalStorage } from '../../localStorage/localStorage';
import './MyFavorites.css';

function MyFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = getFavoritesFromLocalStorage();
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (breedId) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== breedId);
    setFavorites(updatedFavorites);
    saveFavoritesToLocalStorage(updatedFavorites);
  };

  return (
    <div className='favorites-container'>
      <h1>My Favorite Breeds</h1>
      {favorites.length > 0 ? (
        <div className='breeds-grid'>
          {favorites.map(breed => (
            <div key={breed.id} className='breed-card-container'>
              <FontAwesomeIcon
                icon={faStar}
                className='favorite-icon favorite'
                onClick={() => removeFavorite(breed.id)}
              />
              <Link to={`/breed/${breed.id}`} className='breed-card-link'>
                <div className='breed-card'>
                  {breed.reference_image_id && (
                    <img src={`https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`} alt={breed.name} />
                  )}
                  <h2>{breed.name}</h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorite breeds yet.</p>
      )}
    </div>
  );
}

export default MyFavorites;

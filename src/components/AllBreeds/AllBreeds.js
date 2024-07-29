import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { fetchAllBreeds, fetchBreedGroups } from '../../ApiCalls/apiCalls';
import './AllBreeds.css';

function AllBreeds() {
  const [breeds, setBreeds] = useState([]);
  const [breedGroups, setBreedGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [myFavorites, setMyFavorites] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchBreedGroups()
      .then(groupData => {
        setBreedGroups(groupData);
        return fetchAllBreeds();
      })
      .then(breedData => {
        setBreeds(breedData);
        setFilteredBreeds(breedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleGroupChange = (event) => {
    const value = event.target.value;
    setSelectedGroups(prevState =>
      prevState.includes(value)
        ? prevState.filter(group => group !== value)
        : [...prevState, value]
    );
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleFilterChange = () => {
    const filtered = breeds.filter(breed => {
      const breedWeight = parseInt(breed.weight.imperial.split('-').pop().trim());

      const sizeMatch = 
        (selectedSize === 'small' && breedWeight < 15) ||
        (selectedSize === 'medium' && breedWeight >= 15 && breedWeight <= 35) ||
        (selectedSize === 'large' && breedWeight > 35) ||
        selectedSize === '';

      const groupMatch = !selectedGroups.length || selectedGroups.includes(breed.breed_group);

      const searchMatch = breed.name.toLowerCase().includes(searchTerm.toLowerCase());

      return sizeMatch && groupMatch && searchMatch;
    });

    setFilteredBreeds(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [selectedGroups, selectedSize, searchTerm]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const resetFilters = () => {
    setSelectedGroups([]);
    setSelectedSize('');
    setSearchTerm('');
    setFilteredBreeds(breeds);
  };

  const toggleFavorite = (breedId) => {
    setMyFavorites(prevState => {
      const updatedFavorites = prevState.includes(breedId)
        ? prevState.filter(id => id !== breedId)
        : [...prevState, breedId];
      
      console.log('Updated Favorites:', updatedFavorites); 
      return updatedFavorites;
    });
  };

  return (
    <div className='all-breeds-container'>
      <h1>All Breeds</h1>
      <input
        type="text"
        placeholder="Search by breed name"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <button className="filter-button" onClick={toggleFilters}>
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      {showFilters && (
        <div className="overlay">
          <div className="overlay-content">
            <button className="close-button" onClick={toggleFilters}>×</button>
            <div className="filters">
              <div className="filter-section">
                <div className='breed-group-filter'>
                  <h2>Filter by Breed Group</h2>
                  <div className="breed-groups">
                    {breedGroups.map(group => (
                      <label key={group}>
                        <input
                          type="checkbox"
                          value={group}
                          onChange={handleGroupChange}
                          checked={selectedGroups.includes(group)}
                        />
                        {group}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="filter-section">
                <h2>Filter by Size</h2>
                <div className='size-options'>
                  <label>
                    <input
                      type="radio"
                      value="small"
                      checked={selectedSize === 'small'}
                      onChange={handleSizeChange}
                    />
                    Small (less than 15 lbs)
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="medium"
                      checked={selectedSize === 'medium'}
                      onChange={handleSizeChange}
                    />
                    Medium (15-35 lbs)
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="large"
                      checked={selectedSize === 'large'}
                      onChange={handleSizeChange}
                    />
                    Large (more than 35 lbs)
                  </label>
                  <label>
                    <input
                      type="radio"
                      value=""
                      checked={selectedSize === ''}
                      onChange={handleSizeChange}
                    />
                    All Sizes
                  </label>
                </div>
              </div>
              <button className="apply-filters-button" onClick={toggleFilters}>Apply Filters</button>
              <button className="reset-filters-button" onClick={resetFilters}>Reset Filters</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className='breeds-grid'>
          {filteredBreeds.map((breed) => (
            <div key={breed.id} className='breed-card-container'>
              <FontAwesomeIcon
                icon={faStar}
                className={`favorite-icon ${myFavorites.includes(breed.id) ? 'favorite' : ''}`}
                onClick={() => toggleFavorite(breed.id)}
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
      )}
    </div>
  );
}

export default AllBreeds;

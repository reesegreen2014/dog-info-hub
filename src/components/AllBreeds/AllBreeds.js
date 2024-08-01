import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Joyride, { ACTIONS, STATUS } from 'react-joyride';
import { fetchAllBreeds, fetchBreedGroups } from '../../ApiCalls/apiCalls';
import { getFavoritesFromLocalStorage, saveFavoritesToLocalStorage } from '../../localStorage/localStorage';
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
  const [myFavorites, setMyFavorites] = useState(getFavoritesFromLocalStorage);
  const [tourActive, setTourActive] = useState(true);
  const [error, setError] = useState('');

  const steps = [
    {
      target: '.search-bar',
      content: 'Search by Breed name by typing into the search bar',
    },
    {
      target: '.filter-button',
      content: 'Click "Show Filters" to filter by breed group and size',
    },
    {
      target: '.favorite-icon',
      content: 'Favorite dogs by clicking the star icon',
    },
    {
      target: '.nav-button.myfavorites',
      content: 'Visit "My Favorites" to see your favorite dogs',
    },
    {
      target: '.nav-button.resources',
      content: 'Visit "Owner Resources" for resources on owning a pet.'
    }
  ];

  const joyrideStyles = {
    options: {
      arrowColor: '#fff',
      backgroundColor: '#556b8e',
      overlayColor: 'rgba(0, 0, 0, 0.5)',
      primaryColor: '#556b8e',
      textColor: '#fff',
      width: 300,
      zIndex: 1000,
    },
    buttonClose: {
      color: '#fff',
    },
    buttonNext: {
      backgroundColor: '#556b8e',
      color: '#fff',
    },
    buttonBack: {
      color: '#fff',
    },
    buttonSkip: {
      color: '#fff',
    },
  };

  useEffect(() => {
    setLoading(true);
    fetchBreedGroups()
      .then(groupData => {
        setBreedGroups(groupData);
        return fetchAllBreeds();
      })
      .then(breedData => {
        setBreeds(breedData || []);
        setFilteredBreeds(breedData || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    saveFavoritesToLocalStorage(myFavorites);
  }, [myFavorites]);

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

  const handleFilterChange = useCallback(() => {
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
  }, [breeds, selectedSize, selectedGroups, searchTerm]);

  useEffect(() => {
    handleFilterChange();
  }, [selectedGroups, selectedSize, searchTerm, handleFilterChange]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const resetFilters = () => {
    setSelectedGroups([]);
    setSelectedSize('');
    setSearchTerm('');
    setFilteredBreeds(breeds);
  };

  const toggleFavorite = (breed) => {
    setMyFavorites(prevState => {
      const isFavorite = prevState.some(fav => fav.id === breed.id);
      const updatedFavorites = isFavorite
        ? prevState.filter(fav => fav.id !== breed.id)
        : [...prevState, breed];
      
      console.log('Updated Favorites:', updatedFavorites); 
      return updatedFavorites;
    });
  };

  const handleJoyrideCallback = (data) => {
    const { status, action } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status) || action === ACTIONS.CLOSE) {
      setTourActive(false);
    }
  };

  return (
    <div className='all-breeds-container'>
      <Joyride
        steps={steps}
        continuous
        showSkipButton
        callback={handleJoyrideCallback}
        run={tourActive}
        styles={joyrideStyles}
      />
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
        <div>
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            <>
              {filteredBreeds.length === 0 ? (
                <div className="error-message">No breeds found. Please try again later.</div>
              ) : (
                <div className='breeds-grid'>
                  {filteredBreeds.map((breed) => (
                    <div key={breed.id} className='breed-card-container'>
                      <FontAwesomeIcon
                        icon={faStar}
                        className={`favorite-icon ${myFavorites.some(fav => fav.id === breed.id) ? 'favorite' : ''}`}
                        onClick={() => toggleFavorite(breed)}
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
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default AllBreeds;

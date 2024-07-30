import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchBreedDetails } from '../../ApiCalls/apiCalls';
import './BreedDetails.css';

function BreedDetails() {
  const { id } = useParams();
  const [breedDetails, setBreedDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBreedDetails(id).then(data => {
      console.log('Breed details:', data);
      setBreedDetails(data);
      setLoading(false);
    }).catch(error => {
      console.error('Error fetching breed details:', error);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!breedDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className='breed-details-page'>
      {breedDetails.image && <img src={breedDetails.image.url} alt={breedDetails.name} className='breed-image' />}
      <h1 className='dog-name'>{breedDetails.name}</h1>
      <div className='dog-info'>
        <div className='card'>
          <h3>Origin</h3>
          <p>
            {breedDetails.origin 
              ? `The ${breedDetails.name} originates from ${breedDetails.origin}.`
              : "We're working on getting that information! Check back soon."
            }
          </p>
        </div>
        <div className='card'>
          <h3>The {breedDetails.name} was originally bred for</h3>
          <p>
            {breedDetails.bred_for 
              ? breedDetails.bred_for 
              : "We're working on getting that information! Check back soon."
            }
          </p>
        </div>
        <div className='card'>
          <h3>Breed Group</h3>
          <p>
            The {breedDetails.name} belongs to the {breedDetails.breed_group 
              ? breedDetails.breed_group 
              : "We're working on getting that information! Check back soon."
            } group.
          </p>
        </div>
        <div className='card'>
          <h3>Height & Weight</h3>
          <p>
            {(breedDetails.height?.imperial || breedDetails.weight?.imperial) 
              ? `${breedDetails.height?.imperial ? `The ${breedDetails.name} has an average height of ${breedDetails.height.imperial} inches` : ''}${breedDetails.height?.imperial && breedDetails.weight?.imperial ? ' and ' : ''}${breedDetails.weight?.imperial ? `generally weighs between ${breedDetails.weight.imperial} lbs.` : ''}`
              : "We're working on getting that information! Check back soon."
            }
          </p>
        </div>
        <div className='card'>
          <h3>Lifespan</h3>
          <p>
            {breedDetails.life_span 
              ? `The ${breedDetails.name} lives on average between ${breedDetails.life_span}.` 
              : "We're working on getting that information! Check back soon."
            }
          </p>
        </div>
        <div className='card'>
          <h3>Unique characteristics</h3>
          <p>
            {breedDetails.temperament 
              ? `Some of the characteristics that the ${breedDetails.name} is known for are: ${breedDetails.temperament}`
              : "We're working on getting that information! Check back soon."
            }
          </p>
        </div>
      </div>
      <Link to='/all-breeds' className='button back-to-breeds'>Back To All Breeds</Link>
    </div>
  );
}

export default BreedDetails;

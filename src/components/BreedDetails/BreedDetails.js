import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBreedDetails } from '../../ApiCalls/apiCalls';
import './BreedDetails.css'
import { Link } from 'react-router-dom';

function BreedDetails() {

  const {id} = useParams();
  const [breedDetails, setBreedDetails] = useState(null);

  useEffect(() => {
    fetchBreedDetails(id).then(data => {
      console.log('Breed details:', data);
      setBreedDetails(data);
    })
  }, [])

  if (!breedDetails) {
    return <div>Loading...</div>
  }
  
  return (
    <div>
      {breedDetails.image && <img src={breedDetails.image.url} alt={breedDetails.name} />}
      <h1>{breedDetails.name}</h1>
      <p>Did you know? The {breedDetails.name} originates from {breedDetails.origin}.</p>
      <p>Bred for: {breedDetails.bred_for}</p>
      <p>Breed group: {breedDetails.breed_group}</p>
      <p>Height: {breedDetails.height.imperial} inches</p>
      <p>Weight: The {breedDetails.name} weighs on average between {breedDetails.weight.imperial} lbs.</p>
      <p>The {breedDetails.name} lives on average between {breedDetails.life_span} years</p>
      <p>Some of the characteristics that a {breedDetails.name} is known for are: {breedDetails.temperament}</p>
    </div>
  );
}

export default BreedDetails;

import React, { useEffect } from 'react';
import fetchAllBreeds from '../../ApiCalls/apiCalls';

function AllBreeds() {
  useEffect(() => {
    fetchAllBreeds().then(data => {
      console.log('Fetched Breeds:', data);
    });
  }, []);
};

export default AllBreeds;

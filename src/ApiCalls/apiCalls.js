const apiKey = process.env.REACT_APP_DOG_API_KEY;
const apiUrl = 'https://api.thedogapi.com/v1';

export const fetchAllBreeds = () => {
  return fetch(`${apiUrl}/breeds`, {
    headers: {
      'x-api-key': apiKey
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch breeds');
    }
    return response.json();
  })
  .catch(error => {
    console.error('Error fetching breeds:', error);
    return null;
  });
};

export const fetchBreedDetails = (breedId) => {
  return fetch(`${apiUrl}/breeds/${breedId}`, {
    headers: {
      'x-api-key': apiKey
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch breed details');
    }
    return response.json();
  })
  .then(breed => {
    if (breed.reference_image_id) {
      return fetch(`${apiUrl}/images/${breed.reference_image_id}`, {
        headers: {
          'x-api-key': apiKey
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch breed image');
        }
        return response.json();
      })
      .then(imageData => {
        breed.image = imageData;
        return breed;
      });
    }
    return breed;
  })
  .catch(error => {
    console.error('Error fetching breed details:', error);
    return null;
  });
};

export const fetchBreedGroups = () => {
  return fetch(`${apiUrl}/breeds`, {
    headers: {
      'x-api-key': apiKey 
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch breed groups');
      }
      return response.json();
    })
    .then(breeds => {
      const breedGroups = breeds.map(breed => breed.breed_group).filter(Boolean);
      const uniqueBreedGroups = [...new Set(breedGroups)];
      return uniqueBreedGroups;
    })
    .catch(error => {
      console.error('Error fetching breed groups:', error);
      return [];
    });
};
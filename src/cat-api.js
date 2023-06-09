const apiKey = 'live_RaXmTmSyXIg1vynpNlOZ9p18NuM1gTuQL85OnEyzPge8deS8LAetdiIEZ7pB4LS1';



export function fetchBreeds() {
  const url = `https://api.thecatapi.com/v1/breeds`;

  return fetch(url, {
    headers: {
      'x-api-key': apiKey,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch breeds');
      }
      return response.json();
    })
    .then((breeds) => breeds.map((breed) => ({ id: breed.id, name: breed.name })));
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return fetch(url, {
    headers: {
      'x-api-key': apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => data[0]);
}
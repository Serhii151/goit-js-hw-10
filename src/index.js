import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('#breed-select');
const loader = document.querySelector('p.loader');
const error = document.getElementById('error');
const catInfo = document.getElementById('cat-info');

// Fetch breeds and populate select options
fetchBreeds()
  .then((breeds) => {
    loader.style.display = 'none';
    breeds.forEach((breed) => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
    breedSelect.style.display = 'block'; // Показати випадне меню після завершення запиту
  })
  .catch((err) => {
    loader.style.display = 'none';
    error.style.display = 'block';
    console.error(err);
  });

// Event listener for breed selection
breedSelect.addEventListener('change', (event) => {
  const breedId = event.target.value;
  if (breedId) {
    loader.style.display = 'block';
    error.style.display = 'none';
    catInfo.innerHTML = '';

    fetchCatByBreed(breedId)
      .then((cat) => {
        loader.style.display = 'none';
        const image = document.createElement('img');
        image.src = cat.url;
        image.classList.add('cat-image');

        const name = document.createElement('h2');
        name.textContent = cat.breeds[0].name;

        const description = document.createElement('p');
        description.textContent = cat.breeds[0].description;

        const catInfoWrapper = document.createElement('div');
        catInfoWrapper.classList.add('cat-info');

        const catInfoText = document.createElement('div');
        catInfoText.classList.add('cat-info-text');
        catInfoText.appendChild(name);
        catInfoText.appendChild(description);

        catInfoWrapper.appendChild(image);
        catInfoWrapper.appendChild(catInfoText);

        catInfo.appendChild(catInfoWrapper);
      })
      .catch((err) => {
        loader.style.display = 'none';
        error.style.display = 'block';
        console.error(err);
      });
  }
});
import Notiflix from "notiflix";
import SlimSelect from "slim-select";
import { fetchBreeds } from "./cat-api.js";
import { fetchCatByBreed } from "./cat-api.js";

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

refs.loader.classList.replace('loader', 'is-hidden');
refs.error.classList.add('is-hidden');

fetchBreeds()
  .then(breeds => {
    const data = breeds
      .map(breed => `<option value =${breed.id}>${breed.name}</option>`)
      .join();
    refs.select.insertAdjacentHTML('beforeend', data);

    new SlimSelect({
      select: refs.select,
      settings: {
        placeholderText: 'Find a breed',
      },
    });
  })
  .catch(onError);

refs.select.addEventListener('change', findBreed);

function findBreed(evt) {
  refs.loader.classList.replace('is-hidden', 'loader');
  refs.select.classList.add('is-hidden');
  refs.catInfo.classList.add('is-hidden');
  const breedName = evt.target.value;
  fetchCatByBreed(breedName)
    .then(data => {
      refs.loader.classList.replace('loader', 'is-hidden');
      refs.select.classList.remove('is-hidden');
      const { url, breeds } = data[0];
      refs.catInfo.innerHTML = `<div class="img-container"><img src="${url}" alt="${breeds[0].name}"/></div class="cat-bio"><div><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><span>Temperament:</span> ${breeds[0].temperament}</p></div>`;
      refs.catInfo.classList.remove('is-hidden');
    })
    .catch(onError);
}

function onError() {
  Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page');
}
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import Notiflix from 'notiflix';
// Notiflix.Notify.failure('Qui timide rogat docet negare');

const catInfoEl = document.querySelector('.cat-info');
const selectEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
let optionEl = null;

loaderEl.classList.remove('hidden');

fetchBreeds()
  .then(cats => {
    cats.forEach(cat => {
      markupCatOptions(cat);
    });
    selectEl.addEventListener('change', onOptionClick);

    selectEl.classList.remove('hidden');
    loaderEl.classList.add('hidden');
  })
  .catch(error => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!',
      {
        timeout: 6000,
      }
    );
  })
  .finally(() => loaderEl.classList.add('hidden'));

function markupCatOptions(objectCat) {
  const { id, name } = objectCat;
  optionEl = `<option class="option-item" value="${id}">${name}</option>`;
  selectEl.insertAdjacentHTML('beforeend', optionEl);

  return optionEl;
}

function onOptionClick(event) {
  const catOption = event.target.value;

  loaderEl.classList.remove('hidden');
  catInfoEl.classList.add('hidden');

  fetchCatByBreed(catOption)
    .then(cats => {
      markupCatFullInfo(...cats);

      loaderEl.classList.add('hidden');
      catInfoEl.classList.remove('hidden');
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!',
        {
          timeout: 6000,
        }
      );
    })
    .finally(() => loaderEl.classList.add('hidden'));
}

function markupCatFullInfo(objectFullCat) {
  const { name, description, temperament } = objectFullCat.breeds[0];
  let catPage = `<img src="${objectFullCat.url}" width="340px"> <div><h2>${name}</h2> <p>${description}</p> <p>${temperament}</p></div>`;

  catInfoEl.innerHTML = catPage;
}

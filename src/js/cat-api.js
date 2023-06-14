const urlListCatOption = 'https://api.thecatapi.com/v1/breeds';
const API_KEY = `live_o838xSF1VB7Pvx1poewWyULu5l9PaPiNVfKgrtcHN4sMzECgVQ3lCoNwH7H6LyQS`;

export function fetchBreeds() {
  return fetch(urlListCatOption).then(response => response.json());
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${API_KEY}`
  )
    .then(response => response.json())
    .catch(error => console.log(error));
}

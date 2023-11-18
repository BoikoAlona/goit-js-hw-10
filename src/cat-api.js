import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_nRcZgY6XsrMJOGv4O9wQTGtKFkl2MyyBLU4cnUr6bewzmw0MHYLQHtURQBudKJEB";

export function fetchBreeds(breeds) {
    const BASE_URL = `https://api.thecatapi.com/v1`;
    const END_POINT = `/breeds`;
    const PARAMS = new URLSearchParams(``);
    const url = BASE_URL + END_POINT + PARAMS;
    
    return axios
        .get(url)
    .then(res => res.data);
  }

export function fetchCatByBreed(breedId) {
    const BASE_URL = `https://api.thecatapi.com/v1`;
    const END_POINT = `/images/search`;
    const PARAMS = new URLSearchParams({breed_ids: breedId});
    const url = `${BASE_URL}${END_POINT}?${PARAMS}`;

    return axios
        .get(url)
        .then(res => res.data);
  }
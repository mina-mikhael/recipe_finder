import axios from "axios";

export const baseURL =
  "https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2?type=public&";

export const customAxios = axios.create({
  headers: {
    "Accept-Language": "en",
    "X-RapidAPI-Key": process.env.REACT_APP_EDAMAM_KEY,
    "X-RapidAPI-Host": "edamam-recipe-search.p.rapidapi.com",
  },
});

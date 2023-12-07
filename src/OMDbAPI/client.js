import axios from "axios";

const API_KEY = "9f564754"; //"d35a225d"
const BASE_API = `https://www.omdbapi.com/?apikey=${API_KEY}&`;
export const BASE_API_ =
  process.env.REACT_APP_API_BASE || "http://localhost:4000/api";
export const OMBDI_API = `${BASE_API_}/omdb`;

export const findMovieById = async (movieId) => {
  const response = await axios.get(`${BASE_API}i=${movieId}`);
  return response.data;
};

export const searchMoviesByTitle = async (term, filters) => {
  filters.term = term;
  console.log(filters);
  let url = `${OMBDI_API}/search`;

  const response = await axios.post(url, filters, { withCredentials: true });
  return response.data;
};

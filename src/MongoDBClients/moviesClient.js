import axios from "axios";
const request = axios.create({
  withCredentials: true,
});

export const BASE_API =
  process.env.REACT_APP_API_BASE || "http://localhost:4000/api";
export const MOVIES_API = `${BASE_API}/movies`;

export const createMovie = async (movie) => {
  const response = await request.post(`${MOVIES_API}`, movie);
  return response.data;
};
export const findAllMovies = async () => {
  const response = await request.get(`${MOVIES_API}`);
  return response.data;
};
export const findMovieById = async (movieId) => {
  const response = await request.get(`${MOVIES_API}/${movieId}`);
  return response.data;
};
export const findMovieByTitle = async (title) => {
  const response = await request.get(`${MOVIES_API}/title/${title}`);
  return response.data;
};
export const findMovieByOmdbID = async (omdbId) => {
  const response = await request.get(`${MOVIES_API}/omdbId/${omdbId}`);
  return response.data;
};
export const updateMovie = async (title, movie) => {
  const response = await request.put(`${MOVIES_API}/${title}`, movie);
  return response.data;
};
export const deleteMovie = async (movieId) => {
  const response = await request.delete(`${MOVIES_API}/${movieId}`);
  return response.data;
};

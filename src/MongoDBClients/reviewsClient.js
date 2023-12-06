import axios from "axios";
const request = axios.create({
  withCredentials: true,
});

export const BASE_API =
  process.env.REACT_APP_API_BASE || "http://localhost:4000/api";
export const REVIEWS_API = `${BASE_API}/reviews`;

export const createReview = async (review, movieId) => {
  const data = { review: review, movieId: movieId };
  const response = await request.post(`${REVIEWS_API}`, data);
  return response.data;
};
export const findAllReviews = async () => {
  const response = await request.get(`${REVIEWS_API}`);
  return response.data;
};
export const findReviewById = async (reviewId) => {
  const response = await request.get(`${REVIEWS_API}/${reviewId}`);
  return response.data;
};
export const findReviewsByMovieId = async (movieId) => {
  const response = await request.get(`${REVIEWS_API}/movie/${movieId}`);
  return response.data;
};
export const findReviewsByUsername = async (username) => {
  const response = await request.get(`${REVIEWS_API}/username/${username}`);
  return response.data;
};
export const updateReview = async (reviewId, review) => {
  const response = await request.put(`${REVIEWS_API}/${reviewId}`, review);
  return response.data;
};
export const deleteReview = async (reviewId) => {
  const response = await request.delete(`${REVIEWS_API}/${reviewId}`);
  return response.data;
};

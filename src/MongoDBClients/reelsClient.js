import axios from "axios";
const request = axios.create({
  withCredentials: true,
});

export const BASE_API =
  process.env.REACT_APP_API_BASE || "http://localhost:4000/api";
export const REELS_API = `${BASE_API}/reels`;

export const createReel = async (reel, movies) => {
  const data = { reel: reel, movies: movies };
  const response = await request.post(`${REELS_API}`, data);
  return response.data;
};
export const findAllReels = async () => {
  const response = await request.get(`${REELS_API}`);
  return response.data;
};
export const findReelById = async (reelId) => {
  const response = await request.get(`${REELS_API}/${reelId}`);
  return response.data;
};
export const updateReel = async (reelId, reel) => {
  const response = await request.put(`${REELS_API}/${reelId}`, reel);
  return response.data;
};
export const deleteReel = async (reelId) => {
  const response = await request.delete(`${REELS_API}/${reelId}`);
  return response.data;
};

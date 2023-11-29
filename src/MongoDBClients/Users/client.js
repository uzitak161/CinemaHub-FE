import axios from "axios";
const request = axios.create({
  withCredentials: true,
});
export const BASE_API = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";
export const USERS_API = `${BASE_API}/users`;

export const getUsers = async () => {
  const { data } = await request.get(USERS_API);
  return data;
};

export const getUsersByNames = async (name, filters) => {
  let url = `${USERS_API}/names/${name}`;
  if (filters.role && filters.role !== "all") {
    url += `?role=${filters.role}`;
  }
  if (filters.minFollowing && filters.minFollowing > 0) {
    url += `${url.includes("?") ? "&" : "?"}minFollowing=${filters.minFollowing}`;
  }
  const { data } = await request.get(url);
  return data;
};

export const getUser = async (id) => {
  const { data } = await request.get(`${USERS_API}/${id}`);
  return data;
}

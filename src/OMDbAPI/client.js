import axios from "axios";

export const BASE_API = "https://www.omdbapi.com/?apikey=9f564754&"

export const findMovieById = async (movieId) => {
    const response = await axios.get(`${BASE_API}i=${movieId}`);
    return response.data;
}

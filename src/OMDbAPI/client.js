import axios from "axios";

const API_KEY = "9f564754" //"d35a225d"
const BASE_API = `https://www.omdbapi.com/?apikey=${API_KEY}&`

export const findMovieById = async (movieId) => {
    const response = await axios.get(`${BASE_API}i=${movieId}`);
    return response.data;
}

export const searchMoviesByTitle = async (term, filters) => {
    let url = `${BASE_API}s=${term}`;
    if (filters.year && filters.year.length > 0 ) {
        url += `&y=${filters.year}`;
    }
    if (filters.type && filters.type !== "media") {
        url += `&type=${filters.type}`;
    }
    if (filters.pageNumber && filters.pageNumber > 0) {
        url += `&page=${filters.pageNumber}`;
    }
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
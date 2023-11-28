import axios from "axios";
const request = axios.create({
  withCredentials: true,
});

export const BASE_API = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";
export const COMMENTS_API = `${BASE_API}/comments`;

export const createComment = async (comment) => {
    const response = await request.post(`${COMMENTS_API}`, comment);
    return response.data;
}

export const deleteComment = async (commentId) => {
    const response = await request.delete(`${COMMENTS_API}/${commentId}`);
    return response.data;
}

export const findAllComments = async () => {
    const response = await request.get(`${COMMENTS_API}`);
    return response.data;
}

export const findCommentById = async (commentId) => {
    const response = await request.get(`${COMMENTS_API}/${commentId}`);
    return response.data;
}

export const findCommentByMovieId = async (movieId) => {
    const response = await request.get(`${COMMENTS_API}/movie/${movieId}`);
    return response.data;
}

export const findCommentByUsername = async (username) => {
    const response = await request.get(`${COMMENTS_API}/user/${username}`);
    return response.data;
}

export const updateComment = async (commentId, comment) => {
    const response = await request.put(`${COMMENTS_API}/${commentId}`, comment);
    return response.data;
}

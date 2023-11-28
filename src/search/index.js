import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import "./search.css"


// Generate a user card within the search results (center column)
function generateUserCard(user) {
    return (
        <div className="card">
            <div className="card-body d-flex flex-row">
                <h5 className="card-title profile-pic">
                    <Link className="profile-pic" to="/profile/1" > <FaUserAlt className='avatar' /> {user.name}</Link>
                </h5>
                <div className='align-middle'>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Followers: {user.followers}
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Following: {user.following}
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Posts: {user.posts}
                    </h6>
                </div>

            </div>
        </div>
    )
}

// Generate a movie card within the search results (center column)
function generateMovieCard(movie) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    {movie.genre}
                </h6>
            </div>
        </div>
    )
}

// Generate all the search results based on user interactions (center column)
function generateSearchResults(searchResults) {
import React, { useState } from 'react';
import axios from 'axios';
import GridWithPagination from './GridWithPagination';
const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_URL = `${API_BASE}/api/users`;

const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('movies'); // 'movies' or 'users'
    const [results, setResults] = useState([]); // Array of movie or user objects
    const [filters, setFilters] = useState({}); // for storing filters

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchTypeChange = (type) => {
        setSearchType(type);
    };

    const handleSearch = () => {
        if (searchType === 'movies') {
            // Call function to search movies
            searchMovies(searchTerm, filters);
        } else {
            // Call function to search users
            searchUsers(searchTerm);
        }
    };

    const searchMovies = async (term) => {
        const key = "d35a225d"
        const options = {
            method: 'GET',
            url: `https://www.omdbapi.com/?apikey=${key}&s=${term}`,
        };
        try {
            const response = await axios.request(options);
            console.log(response.data.Search);
            setResults(response.data.Search);
        } catch (error) {
            console.error(error);
        }
        // setResults(mockMoviesData.filter((movie) => movie.title.includes(term)))
    };

    const searchUsers = (term) => {
        // Query your database for users here
        // console.log('Searching users:', term);
        // setResults(mockUsersData.filter((user) => user._username.includes(term)));
        // axios.get(`${USERS_URL}/search/${term}`).then((response) => {
        //   console.log(response.data);
        // });
    };

    return (
        <div>
            <h1>Discover</h1>
            <div>
                {searchResults.map((result) => (
                    (result.username) ? generateUserCard(result) : generateMovieCard(result)
                ))}
            </div>
        </div>
    )
}


function Search() {

    const usersData = [
        { id: 1, username: 'user1', name: 'User One', followers: 1500, following: 300, posts: 25 },
        { id: 2, username: 'user2', name: 'User Two', followers: 1200, following: 250, posts: 30 },
        { id: 3, username: 'user3', name: 'User Three', followers: 800, following: 180, posts: 20 },
        // Add more users as needed
    ];

    const moviesData = [
        { id: 1, title: 'Movie One', genre: 'Action', averageRating: 4.2 },
        { id: 2, title: 'Movie Two', genre: 'Drama', averageRating: 3.8 },
        { id: 3, title: 'Movie Three', genre: 'Comedy', averageRating: 4.5 },
        // Add more movies as needed
    ];

    // A mixture of users and reviews kinda like an explore/for-you page
    const foryouSearchResults = [
        { id: 1, title: 'Movie One', genre: 'Action', averageRating: 4.2 },
        { id: 2, title: 'Movie Two', genre: 'Drama', averageRating: 3.8 },
        { id: 3, title: 'Movie Three', genre: 'Comedy', averageRating: 4.5 },
        { id: 1, username: 'user1', name: 'User One', followers: 1500, following: 300, posts: 25 },
        { id: 2, username: 'user2', name: 'User Two', followers: 1200, following: 250, posts: 30 },
        { id: 3, username: 'user3', name: 'User Three', followers: 800, following: 180, posts: 20 },
    ];


    const [searchResults, setSearchResults] = useState(foryouSearchResults);

    const [userSearchTerm, setUserSearchTerm] = useState('');

    const handleUserSearch = (e) => {
        // TODO: Implement user search via API call
        setSearchResults(usersData)
    };

    const [movieSearchTerm, setMovieSearchTerm] = useState('');

    const handleMovieSearch = (e) => {
        // TODO: Implement movie search via API call
        setSearchResults(moviesData)
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className='col-2'>
                    {/* Empty div for spacing */}
                </div>
                <div className="col-2 position-fixed">
                    <h1 className="text-center mb-4">Discover Users</h1>
                    <form>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search users..."
                                aria-label="Search users"
                                aria-describedby="button-user-search"
                                onChange={(e) => setUserSearchTerm(e.target.value)}
                                value={userSearchTerm}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    id="button-user-search"
                                    onClick={handleUserSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>

                    <h1 className="text-center mb-4">Discover Movies</h1>
                    <form>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search movies..."
                                aria-label="Search movies"
                                aria-describedby="button-movie-search"
                                onChange={(e) => setMovieSearchTerm(e.target.value)}
                                value={movieSearchTerm}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    id="button-movie-search"
                                    onClick={handleMovieSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-8 main-body">
                    {generateSearchResults(searchResults)}
                </div>
                <div className="col-2">
                    <h2>Placeholder</h2>
                </div>
            </div>
        </div>
    );
};

export default SearchComponent;

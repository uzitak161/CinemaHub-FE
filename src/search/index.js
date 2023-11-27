import React, { useState } from 'react';
import axios from 'axios';
import MovieResults from './movies';
import UserResults from './users';
import GridWithPagination from './GridWithPagination';
import mockUsersData from '../MockData/users';
import mockMoviesData from '../home/TestImages/TestMovieData';
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

        const options = {
          method: 'GET',
          url: `https://moviesdatabase.p.rapidapi.com/titles/search/title/${term}`,
          headers: {
            'X-RapidAPI-Key': '964be964c7mshdfeb3b0560554e4p1dcb01jsn1021b972c33a',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
          }
        };
        // const key = "d35a225d"
        // const options = {
        //     method: 'GET',
        //     url: `http://img.omdbapi.com/?apikey=${key}&s=${term}`,
        // };
        try {
            const response = await axios.request(options);
            console.log(response.data);
            setResults(response.data.results);
        } catch (error) {
            console.error(error);
        }
        // setResults(mockMoviesData.filter((movie) => movie.title.includes(term)))
    };

    const searchUsers = (term) => {
        // Query your database for users here
        // console.log('Searching users:', term);
        setResults(mockUsersData.filter((user) => user._username.includes(term)));
        // axios.get(`${USERS_URL}/search/${term}`).then((response) => {
        //   console.log(response.data);
        // });
    };

    return (
        <div className='mt-2'>
            <div className="my-2 mx-3">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                />
                <button onClick={() => handleSearchTypeChange('movies')}>Movies</button>
                <button onClick={() => handleSearchTypeChange('users')}>Users</button>
                <button onClick={handleSearch} className="mb-3">Search</button>
            </div>
            {/* Add filter components here */}
            <GridWithPagination items={results} type={searchType} />
        </div>
    );
};

export default SearchComponent;

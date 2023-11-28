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
        <div className='mt-2'>
            <div className="my-2 mx-3">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                />
                <button onClick={() => handleSearchTypeChange('movies')} className={`btn ${searchType === 'movies' ? 'btn-secondary' : 'btn-primary'}`}>Movies</button>
                <button onClick={() => handleSearchTypeChange('users')} className={`btn ${searchType === 'users' ? 'btn-secondary' : 'btn-primary'}`}>Users</button>
                <button onClick={handleSearch} className="btn btn-success">Search</button>
            </div>
            {/* Add filter components here */}
            <GridWithPagination items={results} type={searchType} />
        </div>
    );
};

export default SearchComponent;

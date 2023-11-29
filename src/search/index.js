import React, { useState } from 'react';
import "./search.css"
import GridWithPagination from './GridWithPagination';
import { searchMoviesByTitle } from '../OMDbAPI/client';
import { getUsersByNames } from '../MongoDBClients/Users/client';
import FilterComponent from './FilterComponent';
// import { Toast } from 'bootstrap';

const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('movies'); // 'movies' or 'users'
    const [results, setResults] = useState([]); // Array of movie or user objects
    const [totalItems, setTotalItems] = useState(0);
    const [filters, setFilters] = useState({}); // for storing filters

    const handleMovieFilterChange = (filterName, value) => {
        setFilters({ ...filters, [filterName]: value });
    };

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchTypeChange = (type) => {
        setSearchType(type);
    };

    const handleSearch = (pageNumber) => {
        setSearchTerm(searchTerm.trim());
        if (searchTerm.length === 0) {
            return;
        }
        const filtersWithPageNumber = { ...filters, pageNumber };
        if (searchType === 'movies') {
            // Call function to search movies
            searchMoviesByTitle(searchTerm, filtersWithPageNumber).then((response) => {
                if (response.Response === 'False') {
                    alert(response.Error);
                    return;
                }
                setResults(response.Search);
                setTotalItems(response.totalResults);
            });
        } else {
            // Call function to search users
            getUsersByNames(searchTerm, filtersWithPageNumber).then((response) => {
                setResults(response);
                setTotalItems(response.totalResults);
            });
        }
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
            <FilterComponent searchType={searchType}
                onFilterChange={handleMovieFilterChange} filters={filters} />
            <GridWithPagination items={results} type={searchType} handleSearch={handleSearch}
                totalItems={totalItems} />
        </div>
    );
}

export default SearchComponent;

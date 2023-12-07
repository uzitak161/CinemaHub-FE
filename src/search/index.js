import React, { useState } from "react";
import "./search.css";
import GridWithPagination from "./GridWithPagination";
import { searchMoviesByTitle } from "../OMDbAPI/client";
import { getUsersByNames } from "../MongoDBClients/usersClient";
import Searchbar from "./Searchbar";

const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState(''); // Search term
    const [searchType, setSearchType] = useState('media'); // 'movies' or 'users'
    const [results, setResults] = useState([]); // Array of movie or user objects
    const [totalItems, setTotalItems] = useState(0); // Total number of items
    const [filters, setFilters] = useState({}); // for storing filters

    const handleSearch = (pageNumber) => {
        const trimmedSearchTerm = searchTerm.trim();
        if (trimmedSearchTerm.length === 0) {
            if (searchType === 'users') { 
                getUsersByNames(trimmedSearchTerm, filters).then((response) => {
                    setResults(response);
                    setTotalItems(response.totalResults);
                });
            }
            return;
        }
        const filtersWithPageNumber = { ...filters, pageNumber };
        if (searchType === 'users') {
            // Call function to search users
            getUsersByNames(trimmedSearchTerm, filtersWithPageNumber).then((response) => {
                setResults(response);
                setTotalItems(response.totalResults);
            });
        } else {
            if (searchType !== 'media') {
                filtersWithPageNumber.type = searchType;
            }
            // Call function to search movies
            searchMoviesByTitle(trimmedSearchTerm, filtersWithPageNumber).then((response) => {
                if (response.Response === 'False') {
                    alert(response.Error);
                    return;
                }
                setResults(response.Search);
                setTotalItems(response.totalResults);
            });
        }
    };

    return (
        <div className='mt-2'>
            <Searchbar onSearch={handleSearch} setSearchTerm={setSearchTerm} searchTerm={searchTerm}
                setSearchType={setSearchType} setFilters={setFilters} filters={filters} searchType={searchType} />
            <GridWithPagination items={results} type={searchType} handleSearch={handleSearch}
                totalItems={totalItems} />
        </div>
    );
}

export default SearchComponent;

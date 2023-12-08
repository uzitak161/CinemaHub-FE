import React, { useState } from "react";
import "./index.css";
import GridWithPagination from "./Result/GridWithPagination";
import { searchMoviesByTitle } from "../OMDbAPI/client";
import { getUsersByNames } from "../MongoDBClients/usersClient";
import Searchbar from "./Searchbar";
import { useEffect } from "react";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");       // Search term
  const [searchType, setSearchType] = useState("media");  // 'media', 'episode', 'show' or 'users'
  const [results, setResults] = useState([]);             // Array of movie or user objects
  const [totalItems, setTotalItems] = useState(0);        // Total number of items
  const [filters, setFilters] = useState({});             // for storing filters

  const initializeSearchAndFilters = () => {
    const storedSearchState = JSON.parse(localStorage.getItem('searchState'));
    if (storedSearchState) {
      setSearchTerm(storedSearchState.searchTerm);
      setSearchType(storedSearchState.searchType);
      setFilters(storedSearchState.filters);
      if (storedSearchState.results && storedSearchState.searchTerm && storedSearchState.searchTerm.trim().length > 0) {
        if (storedSearchState.results.length === 0) {
          const pageNumber = storedSearchState.filters.pageNumber || 1;
          handleSearch(pageNumber, storedSearchState.searchTerm, storedSearchState.searchType, storedSearchState.filters);
          return;
        }
        setResults(storedSearchState.results);
        setTotalItems(storedSearchState.totalItems);
      }
    }
  };


  const handleSearchTermChange = (term) => {
    localStorage.setItem('searchState', JSON.stringify({ searchTerm: term, filters, searchType, results, totalItems }));
    setSearchTerm(term);
  };

  const handleSearchTypeChange = (event) => {
    localStorage.setItem('searchState', JSON.stringify({ searchTerm, filters, searchType: event, results, totalItems }));
    setSearchType(event);
    setResults([]);
    setTotalItems(0);
  }

  const handleFiltersChange = (filters) => {
    localStorage.setItem('searchState', JSON.stringify({ searchTerm, filters, searchType, results, totalItems }));
    setFilters(filters);
  };

  const handleSearch = (pageNumber, givenSearchTerm, givenSearchType, givenSearchFilters) => {
    const trimmedSearchTerm = givenSearchTerm ? givenSearchTerm.trim() : searchTerm.trim();
    const sendSearchType = givenSearchType || searchType;
    if (trimmedSearchTerm.length === 0 && sendSearchType !== 'users') {
      return;
    }
    const filtersWithPage = { ...(givenSearchFilters || filters), pageNumber };
    const sendFiltersWithPage = { ...filtersWithPage };
    if (sendSearchType === "users") {
      // Call function to search users
      getUsersByNames(trimmedSearchTerm, sendFiltersWithPage).then(
        (response) => {
          localStorage.setItem('searchState', JSON.stringify({ searchTerm: trimmedSearchTerm, filters: filtersWithPage, searchType, results: response, totalItems: response.length }));
          setResults(response);
          setTotalItems(response.length);
        },
      );
    } else {
      if (sendSearchType !== "media") {
        sendFiltersWithPage.type = sendSearchType;
      }
      // Call function to search movies
      searchMoviesByTitle(trimmedSearchTerm, sendFiltersWithPage).then(
        (response) => {
          if (response.Response === "False") {
            alert(response.Error);
            localStorage.setItem('searchState', JSON.stringify({ searchTerm: null, filters: filtersWithPage, searchType, results: [], totalItems: 0 }));
            return;
          }
          localStorage.setItem('searchState', JSON.stringify({ searchTerm: trimmedSearchTerm, filters: filtersWithPage, searchType, results: response.Search, 
            totalItems: response.totalResults }));
          setResults(response.Search);
          setTotalItems(response.totalResults);
        },
      );
    }
  };

  useEffect(() => {
    initializeSearchAndFilters();
  }, []);


  return (
    <div className='pt-3'>
      <Searchbar onSearch={handleSearch} setSearchTerm={handleSearchTermChange} searchTerm={searchTerm}
        setSearchType={handleSearchTypeChange} setFilters={handleFiltersChange} filters={filters} searchType={searchType} />
      <GridWithPagination items={results} type={searchType} handleSearch={handleSearch}
        totalItems={totalItems} />
    </div>
  );
}

export default SearchComponent;
import React, { useState } from 'react';
import './index.css'; // Import the CSS for styling
import { FaSearch, FaFilter } from 'react-icons/fa'; // Icons for each type
import CustomDropdown from './CustomDropdown';
import FilterComponent from './FilterComponent';

const Searchbar = ({ onSearch, setSearchTerm, searchTerm, setSearchType, searchType, setFilters, filters }) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch();
  };

  const handleShowFilterChange = async () => {
    const newVisibility = !showFilters;
    setShowFilters(newVisibility);
    if (!newVisibility) {
      setFilters({});
    }
  };
    

  return (
    <>
      <form className="wd-search-bar" onSubmit={handleSubmit}>
        <CustomDropdown onSelect={setSearchType} searchType={searchType}/>
        <input
          type="text"
          className="wd-search-input"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="wd-search-button">
          <FaSearch />
        </button>
        <button type="button" className="wd-filter-button" onClick={handleShowFilterChange}>
          <FaFilter />
        </button>
      </form>
      {showFilters && (
        <FilterComponent onFilterChange={setFilters} searchType={searchType} filters={filters} />
      )}
    </>
  );
};

export default Searchbar;

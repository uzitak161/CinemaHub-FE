import React from 'react';
import './index.css'; // Import the CSS for styling
import { FaSearch } from 'react-icons/fa'; // Icons for each type
import CustomDropdown from './CustomDropdown';

const Searchbar = ({ onSearch, setSearchTerm, searchTerm, setSearchType, searchType, setFilter, filters }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch();
    };

    return (
        <form className="wd-search-bar" onSubmit={handleSubmit}>
            <CustomDropdown onSelect={setSearchType} />
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
        </form>
    );
};

export default Searchbar;
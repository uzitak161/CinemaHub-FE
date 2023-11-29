import React from 'react';

const movieFilterOptions = [
  { name: 'year', label: 'Year', type: 'number' },
  { name: 'type', label: 'Type', type: 'select', values: ['all', 'movie', 'series', 'episode'] },
  // Add more filters as needed
];

const userFilterOptions = [
  { name: 'role', label: 'Role', type: 'select', values: ['all', 'ADMIN', 'USER'] },
  // Add more filters as needed
];

const FilterComponent = ({ searchType, onFilterChange, filters }) => {
  const handleChange = (filterName, value) => {
    onFilterChange(filterName, value);
  };

  return (
    <div>
      {(searchType === "movies" ? movieFilterOptions : userFilterOptions).map(option => (
        <div key={option.name}>
          <label htmlFor={option.name}>{option.label}</label>
          {option.type === 'select' ? (
            <select
              name={option.name}
              id={option.name}
              onChange={(e) => handleChange(option.name, e.target.value)}
            >
              {option.values.map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          ) : (
            <input
              type={option.type}
              name={option.name}
              id={option.name}
              onChange={(e) => handleChange(option.name, e.target.value)}
            />
          )}
        </div>
      ))}
      {searchType === "users" && filters.role !== 'ADMIN' && (
        <div>
          <label htmlFor="minFollowing">Number of Following</label>
          <input
            type="number"
            name="minFollowing"
            id="minFollowing"
            onChange={(e) => handleChange('minFollowing', e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default FilterComponent;

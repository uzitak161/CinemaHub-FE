import React, { useState, useEffect } from 'react';
import ItemComponent from './ItemComponent';
import Pagination from './Pagination'; // Assuming you have a Pagination component

const GridWithPagination = ({ handleSearch, items, type, totalItems }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Can be adjusted

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    console.log("currentPage", currentPage);
    handleSearch(currentPage);
  }, [currentPage]); // Fetch data when currentPage changes

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='container-fluid'>
      <div className='row mb-4'>
        {items.map(item =>
        (
          <ItemComponent key={item._id} item={item} type={type} />
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        paginate={paginate}
      />
    </div>
  );
};

export default GridWithPagination;
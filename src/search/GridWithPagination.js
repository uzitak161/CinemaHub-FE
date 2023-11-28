import React, { useState } from 'react';
import ItemComponent from './ItemComponent';
import Pagination from './Pagination'; // Assuming you have a Pagination component

const GridWithPagination = ({ items, type }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Can be adjusted

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='container-fluid'>
      <div className='row'>
        {currentItems.map(item => 
        (
          <ItemComponent key={item._id || item._username} item={item} type={type} />
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={items.length}
        paginate={paginate}
      />
    </div>
  );
};

export default GridWithPagination;
import React, { useState, useEffect } from "react";
import ItemComponent from "./ItemComponent";
import Pagination from "./Pagination"; // Assuming you have a Pagination component

const GridWithPagination = ({ handleSearch, items, type, totalItems }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  useEffect(() => {
    handleSearch(currentPage);
  }, [currentPage]); // Fetch data when currentPage changes

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return items.length === 0 ? (
    <div className="container-fluid mt-4">
      <div className="row mb-4">{/* <h3>No results found</h3> */}</div>
    </div>
  ) : (
    <div className="container-fluid mt-4">
      <div className="row mb-4">
        {items.map((item) => (
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

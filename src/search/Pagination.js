import React from "react";
import "./Pagination.css";
const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const totalNumberOfItems = Math.min(totalItems, 100); // Maximum 100 items can be fetched
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNumberOfItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

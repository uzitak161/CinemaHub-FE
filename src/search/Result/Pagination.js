import React from "react";
import "./Pagination.css";
const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const totalNumberOfItems = Math.min(totalItems, 100); // Maximum 100 items can be fetched
  const totalPages = Math.ceil(totalNumberOfItems / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || i === currentPage || i === currentPage - 1 || i === currentPage + 1) {
      pageNumbers.push(i);
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      pageNumbers.push('...');
    }
  }

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <a onClick={() => paginate(currentPage - 1)} className="page-link" aria-disabled={currentPage === 1}>
            Prev
          </a>
        </li>
        {pageNumbers.map((number, index) => (
          <li key={index} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            {number === '...' ? (
              <span className="page-link">...</span>
            ) : (
              <a onClick={() => paginate(number)} className="page-link">
                {number}
              </a>
            )}
          </li>
        ))}
        <li className="page-item">
          <a onClick={() => paginate(currentPage + 1)} className="page-link" aria-disabled={currentPage === totalPages}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );

  // return (
  //   <nav>
  //     <ul className="pagination">
  //       {pageNumbers.map((number) => (
  //         <li key={number} className="page-item">
  //           <a onClick={() => paginate(number)} className="page-link">
  //             {number}
  //           </a>
  //         </li>
  //       ))}
  //     </ul>
  //   </nav>
  // );
};

export default Pagination;

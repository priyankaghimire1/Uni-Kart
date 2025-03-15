import React from "react";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate an array of page numbers
  const pageNumbers = [...Array(totalPages)].map((_, index) => index + 1);

  return (
    <div className="pagination">
      <span
        onClick={() => onPageChange(currentPage - 1)}
        className={currentPage > 1 ? "" : "pagination__disable"}
      >
        &lt;
      </span>
      {pageNumbers.map((page) => (
        <span
          key={page}
          className={currentPage === page ? "pagination__selected" : ""}
          onClick={() => onPageChange(page)}
        >
          {page}
        </span>
      ))}
      <span
        onClick={() => onPageChange(currentPage + 1)}
        className={currentPage < totalPages ? "" : "pagination__disable"}
      >
        &gt;
      </span>
    </div>
  );
};

export default Pagination;
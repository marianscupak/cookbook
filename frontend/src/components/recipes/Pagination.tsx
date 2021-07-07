import React from "react";

const Pagination = ({
  pageCount,
  currentPage,
  paginate,
}: {
  pageCount: number;
  currentPage: number;
  paginate: (pageNumber: number, pageCount: number) => void;
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      <ul>
        <li key="previous" onClick={() => paginate(-1, pageCount)}>
          <a href="#">{"<"}</a>
        </li>
        {pageNumbers.map((num) => (
          <li key={num}>
            <a
              href="#"
              onClick={() => paginate(num, pageCount)}
              className={num === currentPage ? "active" : ""}
            >
              {num}
            </a>
          </li>
        ))}
        <li key="next" onClick={() => paginate(0, pageCount)}>
          <a href="#">{">"}</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

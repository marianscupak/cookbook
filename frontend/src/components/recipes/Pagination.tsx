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
        <li key="previous">
          <button onClick={() => paginate(-1, pageCount)}>{"<"}</button>
        </li>
        {pageNumbers.map((num) => (
          <li key={num}>
            <button
              onClick={() => paginate(num, pageCount)}
              className={num === currentPage ? "active" : ""}
            >
              {num}
            </button>
          </li>
        ))}
        <li key="next">
          <button onClick={() => paginate(0, pageCount)}>{">"}</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

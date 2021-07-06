import React from "react";

const Pagination = ({
  recipesPerPage,
  totalRecipes,
  currentPage,
  paginate,
}: {
  recipesPerPage: number;
  totalRecipes: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      <ul>
        <li key="previous" onClick={() => paginate(-1)}>
          <a href="#">{"<"}</a>
        </li>
        {pageNumbers.map((num) => (
          <li key={num}>
            <a
              href="#"
              onClick={() => paginate(num)}
              className={num === currentPage ? "active" : ""}
            >
              {num}
            </a>
          </li>
        ))}
        <li key="next" onClick={() => paginate(0)}>
          <a href="#">{">"}</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

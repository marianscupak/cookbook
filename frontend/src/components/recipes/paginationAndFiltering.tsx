import { ChangeEvent, useState } from "react";
import { Recipe } from "../../state/types";

export const usePaginate = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber: number, pageCount: number) => {
    if (pageNumber === 0 || pageNumber === -1) {
      if (pageNumber === 0) {
        setCurrentPage((currentPage) => {
          if (currentPage === pageCount) {
            return 1;
          } else {
            return currentPage + 1;
          }
        });
      } else {
        setCurrentPage((currentPage) => {
          if (currentPage === 1) {
            return pageCount;
          } else {
            return currentPage - 1;
          }
        });
      }
    } else {
      setCurrentPage(pageNumber);
    }
  };

  return { currentPage, paginate };
};

export const sort = (e: ChangeEvent<HTMLSelectElement>, recipes: Recipe[]) => {
  let func: (a: Recipe, b: Recipe) => number;
  if (e.target.value.includes("date")) {
    if (e.target.value.includes("Asc")) {
      func = (a: Recipe, b: Recipe) => {
        return (
          new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf()
        );
      };
    } else {
      func = (a: Recipe, b: Recipe) => {
        return (
          new Date(a.timestamp).valueOf() - new Date(b.timestamp).valueOf()
        );
      };
    }
  } else if (e.target.value.includes("name")) {
    if (e.target.value.includes("Asc")) {
      func = (a: Recipe, b: Recipe) => {
        if (a.name > b.name) {
          return 1;
        } else {
          return -1;
        }
      };
    } else {
      func = (a: Recipe, b: Recipe) => {
        if (b.name > a.name) {
          return 1;
        } else {
          return -1;
        }
      };
    }
  } else {
    func = (a: Recipe, b: Recipe) => {
      return 0;
    };
  }

  return [...recipes].sort(func);
};

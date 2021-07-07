import React, { ChangeEvent, useEffect, useState } from "react";

import { Recipe } from "../../../state/types";
import RecipeMini from "../RecipeMini";
import Pagination from "../Pagination";
import { usePaginate, sort } from "../paginationAndFiltering";
import RecipesDisplay from "../RecipesDisplay";

export const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filters, setFilters] = useState({ name: "", author: "" });
  const { currentPage, paginate } = usePaginate();

  const recipesPerPage = 8;

  useEffect(() => {
    fetch("http://localhost:5000/api/recipes")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setRecipes(json.recipes.reverse());
        }
      });
  }, []);

  const lastIndex = currentPage * recipesPerPage;
  const firstIndex = lastIndex - recipesPerPage;

  const filteredRecipes = recipes.filter((rec) => {
    if (
      rec.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      rec.author?.toLowerCase().includes(filters.author.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

  const paginatedRecipes = filteredRecipes.slice(firstIndex, lastIndex);

  const pageCount = Math.ceil(filteredRecipes.length / recipesPerPage);

  useEffect(() => {
    paginate(1, pageCount);
  }, [filters]);

  const handleUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="container recipes-all">
        <div className="recipe-filters">
          <h1>Filters</h1>
          <label htmlFor="sort">Sort by</label>
          <select
            name="sort"
            id="sort"
            onChange={(e) => setRecipes(sort(e, recipes))}
          >
            <option value="dateAsc">Date (from newest)</option>
            <option value="dateDesc">Date (from oldest)</option>
            <option value="nameAsc">Name ascending</option>
            <option value="nameDesc">Name descending</option>
          </select>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleUpdate}
            value={filters.name}
          />
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            onChange={handleUpdate}
            value={filters.author}
          />
        </div>
        <div className="recipe-display">
          <h1>Recipes</h1>
          {
            <RecipesDisplay
              recipes={paginatedRecipes}
              pageCount={pageCount}
              currentPage={currentPage}
              paginate={paginate}
            />
          }
        </div>
      </div>
    </>
  );
};

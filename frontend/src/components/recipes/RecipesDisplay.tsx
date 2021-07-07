import React, { useState } from "react";
import { Recipe } from "../../state/types";
import Pagination from "./Pagination";
import RecipeMini from "./RecipeMini";

const RecipesDisplay = ({
  recipes,
  pageCount,
  currentPage,
  paginate,
}: {
  recipes: Recipe[];
  pageCount: number;
  currentPage: number;
  paginate: (pageNumber: number, pageCount: number) => void;
}) => {
  return (
    <div className="recipe-container">
      <div className="recipes">
        {recipes.length ? (
          recipes.map((val: Recipe) => {
            return <RecipeMini recipe={val} key={val._id} />;
          })
        ) : (
          <h1>No recipes found.</h1>
        )}
      </div>
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default RecipesDisplay;

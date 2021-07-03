import React, { ChangeEvent, useEffect, useState } from "react";
import { Recipe } from "../../../state/types";
import RecipeMini from "../RecipeMini";

export const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/recipes")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          json.recipes.forEach((recipe: string, index: number) => {
            json.recipes[index].images = json.images[index];
          });

          setRecipes(json.recipes);
        }
      });
  }, []);

  const handleFilters = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    switch (e.target.name) {
      case "sort":
        const sortedRecipes = recipes.sort((a: Recipe, b: Recipe) => {
          return a.images.length - b.images.length;
          // if (e.target.value.includes("date")) {
          //   if (e.target.value.includes("Asc")) {
          //     return new Date(a.timestamp) < new Date(b.timestamp) ? -1 : 1;
          //   }
          //   return new Date(a.timestamp) > new Date(b.timestamp) ? 1 : -1;
          // }
          // return 0;
          // Add sorting by other params
        });
        setRecipes([...sortedRecipes]);
        break;
    }
  };

  return (
    <div className="container recipes-all">
      <div className="recipe-filters">
        <h1>Filters</h1>
        <label htmlFor="sort">Sort by</label>
        <select name="sort" id="sort" onChange={handleFilters}>
          <option value="dateAsc">Date (from newest)</option>
          <option value="dateDesc">Date (from oldest)</option>
          <option value="nameAsc">Name ascending</option>
          <option value="nameDesc">Name descending</option>
        </select>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={handleFilters} />
        <label htmlFor="author">Author</label>
        <input type="text" name="author" onChange={handleFilters} />
      </div>
      <div className="recipe-display">
        <h1>Recipes</h1>
        <div className="recipes">
          {recipes.length ? (
            recipes.map((val: Recipe) => {
              return <RecipeMini recipe={val} key={val._id} />;
            })
          ) : (
            <h1>No recipes found.</h1>
          )}
        </div>
      </div>
    </div>
  );
};

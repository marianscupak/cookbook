import React, { ChangeEvent, useEffect, useState } from "react";
import { Recipe } from "../../../state/types";
import RecipeMini from "../RecipeMini";

export const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filters, setFilters] = useState({ name: "", author: "" });
  useEffect(() => {
    fetch("http://localhost:5000/api/recipes")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setRecipes(json.recipes);
        }
      });
  }, []);

  const sort = (e: ChangeEvent<HTMLSelectElement>) => {
    let func: (a: Recipe, b: Recipe) => number;
    if (e.target.value.includes("date")) {
      if (e.target.value.includes("Asc")) {
        func = (a: Recipe, b: Recipe) => {
          return (
            new Date(a.timestamp).valueOf() - new Date(b.timestamp).valueOf()
          );
        };
      } else {
        func = (a: Recipe, b: Recipe) => {
          return (
            new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf()
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

    const sortedRecipes = recipes.sort(func);
    setRecipes([...sortedRecipes]);
  };

  const handleUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredRecipes = recipes.filter((rec) => {
    if (
      rec.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      rec.author?.toLowerCase().includes(filters.author.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

  return (
    <div className="container recipes-all">
      <div className="recipe-filters">
        <h1>Filters</h1>
        <label htmlFor="sort">Sort by</label>
        <select name="sort" id="sort" onChange={sort}>
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
        <div className="recipes">
          {filteredRecipes.length ? (
            filteredRecipes.map((val: Recipe) => {
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

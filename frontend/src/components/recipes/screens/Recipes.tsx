import React, { useEffect, useState } from "react";
import RecipeMini from "../RecipeMini";

export const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
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

  return (
    <div className="container">
      <h1>Recipes</h1>
      <div className="recipes">
        {recipes.length ? (
          recipes.map((val, ind) => {
            return <RecipeMini recipe={val} key={ind} />;
          })
        ) : (
          <h1>No recipes found.</h1>
        )}
      </div>
    </div>
  );
};

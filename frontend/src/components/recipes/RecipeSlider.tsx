import React, { useEffect, useState } from "react";
import { Recipe } from "../../state/types";
import RecipeMini from "../recipes/RecipeMini";

const RecipeSlider = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/recipes")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setRecipes(json.recipes.slice(0, 8));
        }
      });
  }, []);
  return (
    <div className="r-slider">
      <div className="slide-track">
        {recipes.length
          ? recipes.map((val, index) => {
              return (
                <div className="slide" key={index}>
                  <RecipeMini recipe={val} />
                </div>
              );
            })
          : ""}
        {recipes.length
          ? recipes.map((val, index) => {
              return (
                <div className="slide" key={val.name}>
                  <RecipeMini recipe={val} />
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default RecipeSlider;

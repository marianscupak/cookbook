import React, { useEffect, useState } from "react";
import { Recipe } from "../../state/types";
import RecipeMini from "../recipes/RecipeMini";

const RecipeSlider = ({ recipes }: { recipes: Recipe[] }) => {
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

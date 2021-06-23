import React, { useEffect } from "react";
import { Recipe } from "../state/types";

const RecipeMini = (recipe: any) => {
  return (
    <div className="recipe-miniature">
      <h2>{recipe.props.name}</h2>
      <h3>{recipe.props.description}</h3>
    </div>
  );
};

export default RecipeMini;

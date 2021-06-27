import React, { useEffect } from "react";
import { Recipe } from "../../state/types";

const RecipeMini = (recipe: any) => {
  return (
    <div className="recipe-miniature">
      <h2>{recipe.props.name}</h2>
      {recipe.props.images.map((val: string, index: number) => {
        return (
          <img
            src={`http://localhost:5000/${recipe.props._id}/${val}`}
            key={index}
            height="200px"
          />
        );
      })}
    </div>
  );
};

export default RecipeMini;

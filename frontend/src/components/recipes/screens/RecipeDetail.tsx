import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Recipe, defaultRecipe } from "../../../state/types";
import ImageSlider from "../ImageSlider";

export const RecipeDetail = () => {
  const [recipe, setRecipe] = useState<Recipe>(defaultRecipe);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`http://localhost:5000/api/recipes/${id}`)
      .then((res) => res.json())
      .then((json) => {
        json.recipe.images = json.images;
        json.recipe.author = json.author;
        setRecipe(json.recipe);
      });
  }, []);

  return (
    <div className="container">
      {recipe.name != "" ? (
        <div className="recipe-detail">
          <h1>{recipe.name}</h1>
          <h2>Author: {recipe.author}</h2>
          <ImageSlider images={recipe.images} id={recipe._id} />
          <p className="mb-10">{recipe.description}</p>
          <h2>Ingredients</h2>
          <ol className="mb-10">
            {recipe.ingredients.map((ingredient, index) => {
              return <li key={index}>{ingredient}</li>;
            })}
          </ol>
          <h2>Instructions</h2>
          <ul>
            {recipe.steps.map((step, index) => {
              return (
                <li key={index}>
                  <h3>Step {index + 1}:</h3>
                  {step}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

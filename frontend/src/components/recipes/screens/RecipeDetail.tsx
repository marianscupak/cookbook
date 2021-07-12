import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../state/hooks";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { useAlert } from "react-alert";

import { Recipe, defaultRecipe } from "../../../state/types";
import ImageSlider from "../ImageSlider";
import StarIcon from "../../../../public/star.svg";

export const RecipeDetail = () => {
  const [recipe, setRecipe] = useState<Recipe>(defaultRecipe);
  const [isStarred, setIsStarred] = useState(false);
  const [starCount, setStarCount] = useState(0);
  const { id } = useParams<{ id: string }>();
  const token = useAppSelector((state) => state.auth.data.token);
  const status = useAppSelector((state) => state.auth.status);
  const history = useHistory();
  const alert = useAlert();

  useEffect(() => {
    fetch(`http://localhost:5000/api/recipes/${id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          json.recipe.images = json.images;
          json.recipe.author = json.author;
          setRecipe(json.recipe);

          fetch("http://localhost:5000/api/recipes/stars", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              recipeId: json.recipe._id,
            }),
          })
            .then((res) => res.json())
            .then((json) => {
              if (json.success) {
                setStarCount(json.count);
              }
            });
        }
      });
  }, []);

  useEffect(() => {
    if (status === "loggedin") {
      fetch("http://localhost:5000/api/stars/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          recipeId: id,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            setIsStarred(json.star);
          }
        });
    }
  }, [status]);

  const toggleStar = () => {
    if (!token) {
      history.push("/login");
      return;
    }
    fetch("http://localhost:5000/api/stars/toggle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        recipeId: id,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setIsStarred(!isStarred);
          if (json.star) {
            setStarCount(starCount + 1);
          } else {
            setStarCount(starCount - 1);
          }
          alert.success(json.message);
        } else {
          alert.error(json.message);
        }
      });
  };

  return (
    <div className="container">
      {recipe.name != "" ? (
        <div className="recipe-detail">
          <h1>{recipe.name}</h1>
          <h2>Author: {recipe.author}</h2>
          <ImageSlider images={recipe.images} id={recipe._id} />
          <div className="stars">
            <button
              className={"star-button" + (isStarred ? " starred" : "")}
              onClick={toggleStar}
            >
              <img src={StarIcon.toString()} alt="Star" />
            </button>
            <h2>{starCount}</h2>
          </div>
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

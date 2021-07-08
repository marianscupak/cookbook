import React, { useEffect, useState } from "react";

import LoggedIn from "./LoggedIn";
import NotLoggedIn from "./NotLoggedIn";
import { useAppSelector } from "../../state/hooks";
import RecipeSlider from "../recipes/RecipeSlider";
import { Recipe } from "../../state/types";

const Home = () => {
  const data = useAppSelector((state) => state.auth.data);

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/recipes/popular")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setRecipes(json.recipes);
        }
      });
  }, []);

  return (
    <div className="container">
      {data.token ? (
        <LoggedIn username={data.user.username} />
      ) : (
        <NotLoggedIn />
      )}
      <div className="popular-recipes">
        <h1>Most popular recipes</h1>
        <RecipeSlider recipes={recipes} />
      </div>
    </div>
  );
};

export default Home;

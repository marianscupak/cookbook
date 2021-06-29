import React from "react";

import LoggedIn from "./LoggedIn";
import NotLoggedIn from "./NotLoggedIn";
import { useAppSelector } from "../../state/hooks";
import RecipeSlider from "../recipes/RecipeSlider";

const Home = () => {
  const data = useAppSelector((state) => state.auth.data);

  return (
    <div className="container">
      {data.token ? (
        <LoggedIn username={data.user.username} />
      ) : (
        <NotLoggedIn />
      )}
      <div className="popular-recipes">
        <h1>Most popular recipes</h1>
        <RecipeSlider />
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useAppSelector } from "../state/hooks";
import { Recipe } from "../state/types";
import RecipeMini from "./recipes/RecipeMini";
import AddIcon from "../../public/add.svg";

const Profile = () => {
  const auth = useAppSelector((state) => state.auth);

  const [recipes, setRecipes] = useState([]);

  if (auth.data.token === "") {
    return <Redirect to="/" />;
  }

  useEffect(() => {
    fetch("http://localhost:5000/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: auth.data.token,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setRecipes(json.recipes);
        }
      });
  }, []);

  return (
    <div className="container">
      <h1>{auth.data.user.username}</h1>
      <ul>
        <li>E-Mail: {auth.data.user.email}</li>
      </ul>
      <div className="flex-row">
        <h1>Your recipes</h1>
        <Link to="/recipes/add" className="addButton">
          <img src={AddIcon.toString()} alt="Add recipe" height="20px" />
        </Link>
      </div>
      <ul className="profile-recipes">
        {recipes.length ? (
          recipes.map((val, index) => {
            return (
              <li key={index}>
                <RecipeMini props={val} key={index} />
              </li>
            );
          })
        ) : (
          <li>
            <h1>You have no recipes.</h1>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Profile;

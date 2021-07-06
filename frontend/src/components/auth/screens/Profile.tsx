import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useAppSelector } from "../../../state/hooks";
import RecipeMini from "../../recipes/RecipeMini";
import AddIcon from "../../../../public/add.svg";

export const Profile = () => {
  const auth = useAppSelector((state) => state.auth);

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  if (auth.data.token === "") {
    history.push("/");
  }

  useEffect(() => {
    setLoading(true);
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
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
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
        {loading ? (
          <h1>"Loading..."</h1>
        ) : recipes.length ? (
          recipes.map((val, index) => {
            return (
              <li key={index}>
                <RecipeMini recipe={val} key={index} />
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

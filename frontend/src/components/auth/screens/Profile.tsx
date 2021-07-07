import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useAppSelector } from "../../../state/hooks";
import RecipeMini from "../../recipes/RecipeMini";
import AddIcon from "../../../../public/add.svg";
import RecipesDisplay from "../../recipes/RecipesDisplay";
import { usePaginate } from "../../recipes/paginationAndFiltering";
import { Recipe } from "../../../state/types";

export const Profile = () => {
  const auth = useAppSelector((state) => state.auth);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const { currentPage, paginate } = usePaginate();

  const history = useHistory();

  const recipesPerPage = 4;

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

  const pageCount = Math.ceil(recipes.length / recipesPerPage);

  const lastIndex = currentPage * recipesPerPage;
  const firstIndex = lastIndex - recipesPerPage;

  const paginatedRecipes = recipes.slice(firstIndex, lastIndex);

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
      <RecipesDisplay
        recipes={paginatedRecipes}
        pageCount={pageCount}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

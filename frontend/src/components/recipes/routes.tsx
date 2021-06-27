import React from "react";
import { Route } from "react-router-dom";

import * as Recipes from "./screens";

export const recipeRoutes = [
  <Route exact path="/recipes" component={Recipes.Recipes} />,
  <Route exact path="/recipes/add" component={Recipes.RecipeAdd} />,
];

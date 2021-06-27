import React from "react";
import { Switch, Route } from "react-router";

import Home from "./Home";
import { authRoutes } from "./auth/routes";
import { recipeRoutes } from "./recipes/routes";

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    {authRoutes}
    {recipeRoutes}
  </Switch>
);

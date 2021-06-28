import React from "react";
import { Route } from "react-router-dom";

import * as Auth from "./screens";

export const authRoutes = [
  <Route exact path="/login" component={Auth.Login} key="login" />,
  <Route exact path="/register" component={Auth.Register} key="register" />,
  <Route exact path="/profile" component={Auth.Profile} key="profile" />,
];

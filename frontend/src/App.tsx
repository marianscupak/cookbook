import React from "react";
import "./index.scss";
import { useEffect } from "react";
import { Route, Switch } from "react-router";
import { useAppSelector, useAppDispatch } from "./state/hooks";
import { RootState } from "./state/store";
import { bindActionCreators } from "redux";
import * as actionCreators from "./state/action-creators";
import Header from "./components/layout/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import RecipeAdd from "./components/recipes/RecipeAdd";
import Recipes from "./components/recipes/Recipes";

const App = () => {
  const auth = useAppSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();

  const { verify } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:5000/api/verify?token=" + token)
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            verify({
              user: {
                username: json.user.username,
                email: json.user.email,
              },
              token,
            });
          } else {
            localStorage.removeItem("token");
          }
        });
    }
  }, []);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/recipes">
          <Recipes />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/recipes/add">
          <RecipeAdd />
        </Route>
      </Switch>
    </div>
  );
};

export default App;

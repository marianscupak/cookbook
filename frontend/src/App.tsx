import React from "react";
import { useEffect } from "react";
import { bindActionCreators } from "redux";

import "./index.scss";
import { useAppSelector, useAppDispatch } from "./state/hooks";
import { Routes } from "./components/routes";
import { RootState } from "./state/store";
import * as actionCreators from "./state/action-creators";
import Header from "./components/layout/Header";

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
      <Routes />
    </div>
  );
};

export default App;

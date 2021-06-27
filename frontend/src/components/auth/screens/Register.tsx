import React, { useState, ChangeEvent, MouseEvent } from "react";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { RootState } from "../../../state/store";
import { useAppSelector, useAppDispatch } from "../../../state/hooks";
import * as actionCreators from "../../../state/action-creators";

export const Register = () => {
  const token = useAppSelector((state: RootState) => state.auth.data.token);

  const [userLogin, changeUser] = useState({
    username: "",
    password: "",
    password2: "",
    email: "",
  });

  const dispatch = useAppDispatch();

  const { verify } = bindActionCreators(actionCreators, dispatch);

  if (token !== "") {
    return <Redirect to="/" />;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeUser({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  };

  const processForm = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { username, password, password2, email } = userLogin;

    if (password === password2) {
      fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            localStorage.setItem("token", json.token);
            verify({
              user: {
                username,
                email,
              },
              token: json.token,
            });
          }
        });
    }
  };

  return (
    <div className="container">
      <div className="loginWrapper">
        <h1>Register</h1>
        <form action="#" className="login-form" method="post">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            value={userLogin.username}
            required
          />
          <label htmlFor="username">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={userLogin.email}
            required
          />
          <label htmlFor="username">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={userLogin.password}
            required
          />
          <label htmlFor="username">Verify Password: </label>
          <input
            type="password"
            name="password2"
            id="password2"
            onChange={handleChange}
            value={userLogin.password2}
            required
          />
          <button onClick={processForm} type="submit">
            Register
          </button>
          <div className="text">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

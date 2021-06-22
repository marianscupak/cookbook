import React, { useState, ChangeEvent, MouseEvent } from "react";
import { bindActionCreators } from "redux";
import { RootState } from "../state/store";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../state/hooks";
import * as actionCreators from "../state/action-creators";

const Login = () => {
  const token = useAppSelector((state: RootState) => state.auth.data.token);

  const [userLogin, changeUser] = useState({ username: "", password: "" });

  const dispatch = useAppDispatch();

  const { login } = bindActionCreators(actionCreators, dispatch);

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
    login(userLogin.username, userLogin.password);
  };

  return (
    <div className="container">
      <div className="loginWrapper">
        <h1>Login</h1>
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
          <label htmlFor="username">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={userLogin.password}
            required
          />
          <button onClick={processForm} type="submit">
            Login
          </button>
          <div className="text">
            Don't have an account yet? <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

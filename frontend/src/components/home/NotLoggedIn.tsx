import React from "react";
import { Link } from "react-router-dom";

import LoginIcon from "../../../public/login.svg";
import RegisterIcon from "../../../public/register.svg";
import BurgerIcon from "../../../public/burger.svg";

const NotLoggedIn = () => {
  return (
    <>
      <h1>Welcome to the Cookbook app!</h1>
      <div className="options">
        <Link to="/login" className="option">
          <img src={LoginIcon.toString()} alt="Login" />
          <h1>Already have an account? Login!</h1>
        </Link>
        <Link to="/register" className="option">
          <img src={RegisterIcon.toString()} alt="Register" />
          <h1>Don't have an account yet? Register!</h1>
        </Link>
        <Link to="/recipes" className="option">
          <img src={BurgerIcon.toString()} alt="Other's recipes" />
          <h1>Look at other's recipes</h1>
        </Link>
      </div>
    </>
  );
};

export default NotLoggedIn;

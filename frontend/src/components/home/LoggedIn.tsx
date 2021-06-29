import React from "react";
import { Link } from "react-router-dom";

import BurgerIcon from "../../../public/burger.svg";
import SpaguettiIcon from "../../../public/spaguetti.svg";
import TrayIcon from "../../../public/tray.svg";

const LoggedIn = ({ username }: { username: string }) => {
  return (
    <>
      <h1>Hello {username}!</h1>
      <div className="options">
        <Link to="/profile" className="option">
          <img src={SpaguettiIcon.toString()} alt="Own recipes" />
          <h1>Look at your own recipes</h1>
        </Link>
        <Link to="/recipes" className="option">
          <img src={BurgerIcon.toString()} alt="Others recipes" />
          <h1>Look at others recipes</h1>
        </Link>
        <Link to="/recipes/add" className="option">
          <img src={TrayIcon.toString()} alt="Add recipe" />
          <h1>Add your favorite recipe</h1>
        </Link>
      </div>
    </>
  );
};

export default LoggedIn;

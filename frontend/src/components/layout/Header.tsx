import React, { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { RootState } from "../../state/store";
import Logo from "../../../public/logo.svg";
import * as actionCreators from "../../state/action-creators";
import { bindActionCreators } from "redux";

const Header = () => {
  const auth = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const { logout } = bindActionCreators(actionCreators, dispatch);

  const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();

    logout();
  };

  return (
    <header>
      <div>
        <Link to="/" className="brand">
          <img src={Logo.toString()} alt="Cookbook" height="50px" />
          <h1>Cookbook</h1>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/recipes">Recipes</Link>
          </li>
          {auth.data.token === "" ? (
            <li>
              <Link to="/login">Login</Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/profile">{auth.data.user.username}</Link>
              </li>
              <li>
                <a href="#" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

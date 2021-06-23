import React from "react";
import { Redirect } from "react-router-dom";
import { useAppSelector } from "../state/hooks";

const Profile = () => {
  const auth = useAppSelector((state) => state.auth);

  if (auth.data.token === "") {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <h1>{auth.data.user.username}</h1>
    </div>
  );
};

export default Profile;

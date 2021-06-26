import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

export const LandingPage = () => {

  const {user} = useContext(AuthContext)

  return (
    <div>
      <h3>Welcome, {user.username}</h3>
    </div>
  );
};

export default LandingPage;

import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/auth";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  let history = useHistory();

  // using setUser method from AuthProvider
  const { setUser } = useContext(AuthContext);

  const authenticateUser = async (event) => {
    event.preventDefault();
    let res;
    try {
      res = await axios.post(`/auth/login`, {
        username,
        password,
      });
    } catch (error) {
      console.log(error);
      setErrorLogin(error);
    }

    const user = res.data;
    try {
      setUser(user);
      history.push("/home");
    } catch (error) {
      console.log(error);
      setErrorLogin(error);
    }
  };

  return (
    <div className="loginContainer">
      <form onSubmit={authenticateUser}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input
            name="username"
            type="text"
            onChange={(event) => setUsername(event.target.value)}
          />
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input
            name="password"
            type="text"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        {errorLogin && errorLogin.response && (
          <div>{errorLogin.response.data}</div>
        )}
      </form>
    </div>
  );
};

export default Login

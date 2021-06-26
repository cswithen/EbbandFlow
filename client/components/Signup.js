import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/auth";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = () => {
  let history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(AuthContext);

  const authenticateUser = async (event) => {
    event.preventDefault();

    let res;
    try {
      res = await axios.post("/auth/signup", {
        username,
        password,
      });
    } catch (error) {
      console.error(error);
    }

    const user = res.data;
    try {
      setUser(user);
      history.push("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <section>
        <form>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </form>

        <div>
          <button type="submit" onClick={authenticateUser}>
            Sign Up
          </button>
        </div>
      </section>
    </div>
  );
};

export default Signup

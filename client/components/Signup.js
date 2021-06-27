import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/auth";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  background-color: #d99379;
  color: #ffffff;
  border: none;
  border-radius: 3px;
  font-family: Montserrat;
`;

const Button = styled.button`
  cursor: pointer;
  background: ${(props) => (props.primary ? "#639cbf" : "#d99379")};
  color: ${(props) => (props.primary ? "#f2ebec" : "#f2ebec")};

  font-size: 1em;
  margin: 0.25em;
  padding: 0.25em 0.25em;
  border: 0px solid ${(props) => (props.primary ? "#FFFFFF" : "")};
  border-radius: 3px;
  transition: 0.5s all ease-out;

  &:hover {
    color: #735449;
    background-color: ${(props) => (props.primary ? "#ffffff" : "#ffffff")}
`;

const BigContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 20em;
  flex: 2 0 auto;
  align-content: center;
  margin-top: 10em;
`;

const Title = styled.h2`

`;

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
        <form>
          <BigContainer>
            <Title>Sign Up</Title>
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />

            <label htmlFor="password">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          <Button primary type="submit" onClick={authenticateUser}>
            Sign Up
          </Button>
          </BigContainer>
        </form>
    </div>
  );
};

export default Signup;

import axios from "axios";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

const NavLink = ({ name, path }) => {
  return (
    <Link to={path} className="navLink">
      {name}
    </Link>
  );
};

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);

  let history = useHistory();

  const linksForLoggedOut = [
    {
      id: 1,
      name: "Login",
      path: "/login",
    },
    {
      id: 2,
      name: "Sign Up",
      path: "/signup",
    },
  ];

  const linksForLoggedIn = [
    {
      id: 1,
      name: "Sequences",
      path: "/sequences",
    },
  ];

  const logout = async () => {
    try {
      await axios.post("/auth/logout");
      setUser({});
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>HomePage</h1>
      <nav>
        <Link to="/">
          <div className="logo">
            <span>Home</span>
          </div>
        </Link>
        <div>
          {!user.id &&
            linksForLoggedOut.map((link) => (
              <NavLink key={link.id} {...link} />
            ))}
          {user.id && (
            <div>
              {linksForLoggedIn.map((link) => (
              <NavLink key={link.id} {...link} />
              ))}
              <a href="#" className="navLink" onClick={logout}>
                Logout
              </a>
            </div>
          )}
        </div>
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;

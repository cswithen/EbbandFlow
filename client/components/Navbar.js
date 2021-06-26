import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
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

  const links = [
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
          {links.map((link) => (
            <NavLink key={link.id} {...link} />
          ))}
        </div>
        <a href="#" className="navLink" onClick={logout}>
          Logout
        </a>
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;

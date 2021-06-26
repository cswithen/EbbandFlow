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
      to: "/login",
    },
    {
      id: 2,
      name: "Sign Up",
      to: "/signup",
    },
  ];

  const linksForLoggedIn = [
    {
      id: 1,
      name: `${user.username}`,
      to: "/profile",
    },
    {
      id: 2,
      name: "myworkouts",
      to: "/myworkouts",
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
        <Link to="/workouts">
          <div className="logo">
            <span>Workouts</span>
          </div>
        </Link>
        <Link to="/poses">
          <div className="logo">
            <span>Poses</span>
          </div>
        </Link>
        {/* {user.id && <NavLink to="/myworkouts" name="My Workouts" />} */}
        <div>
          {!user.id &&
            linksForLoggedOut.map((link) => (
              <Link key={link.id} {...link}>
                {link.name}
              </Link>
            ))}
          {user.id && (
            <div>
              {linksForLoggedIn.map((link) => (
                <Link key={link.id} {...link}>
                  {link.name}
                </Link>
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

import axios from "axios";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import styled from "styled-components";

// const BigContainer = styled.div`
//   // display: flex;
//   // flex-direction: row;
//   // justify-content: space-between;
// `;

const NavContainer = styled.nav`
  margin: 8px;
  flex: 2 0 auto;
  flex-direction: row;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const linkStyle = {
  textDecoration: "none",
  color: '#1e403c'
}


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
    // {
    //   id: 1,
    //   name: `${user.username}`,
    //   to: "/profile",
    // },
    {
      id: 2,
      name: "My Workouts",
      to: "/me/workouts/",
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
      <NavContainer>
      <h1>HomePage</h1>
        <div>
          <Link to="/" style={linkStyle}>
            <div className="logo">
              <span>Home</span>
            </div>
          </Link>
          <Link to="/workouts" style={linkStyle}>
            <div className="logo">
              <span>Workouts</span>
            </div>
          </Link>
          <Link to="/poses" style={linkStyle}>
            <div className="logo">
              <span>Poses</span>
            </div>
          </Link>
        </div>
        {/* {user.id && <NavLink to="/myworkouts" name="My Workouts" />} */}
        <div>
          {!user.id &&
            linksForLoggedOut.map((link) => (
              <Link key={link.id} {...link} style={linkStyle}>
                {link.name}
              </Link>
            ))}
          {user.id && (
            <div>
              {linksForLoggedIn.map((link) => (
                <Link key={link.id} {...link} style={linkStyle}>
                  {link.name}
                </Link>
              ))}
              <a href="#" className="navLink" onClick={logout} style={linkStyle}>
                Logout
              </a>
            </div>
          )}
        </div>
      </NavContainer>
    </div>
  );
};

export default Navbar;

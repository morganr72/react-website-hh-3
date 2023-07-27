import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Button } from "./Button";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return (
      <button className="nav-button" onClick={() => loginWithRedirect()}>
        Log In
      </button>
    );
  };
  const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
      <button
        className="nav-button"
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
      </button>
    );
  };

  const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
      return <div>Loading ...</div>;
    }

    return (
      isAuthenticated && (
        <div className="nav-button">
          {/* <img src={user.picture} alt={user.name} /> */}
          <p>{user.email}</p>
        </div>
      )
    );
  };
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            GasSaver
            <i className="fab fa-typo3" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
            {/* This is making the hamburger menu toggle click between 2 modes */}
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {/* <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to="/Temps" className="nav-links" onClick={closeMobileMenu}>
                Temp History
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/AllData"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                All Data
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Commands"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Commands
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/InputProfile"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Input Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Prices"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Prices
              </Link>
            </li>
            <li className="nav-item">
              <LoginButton />
            </li>
            <LogoutButton />
            <Profile />
          </ul>
          {/* {button && <Button buttonStyle="btn--outline">SIGN UP</Button>} */}
        </div>
      </nav>
    </>
  );
}

export default Navbar;

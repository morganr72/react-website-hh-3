import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
// import { Button } from "./Button";
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
        <button className="nav-button">
          <p>{user.email}</p>
        </button>
      )
    );
  };

  const ElecLink = () => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
      return <div>Loading ...</div>;
    }

    return (
      isAuthenticated && (
        <Link to="/ElecData" className="nav-links" onClick={closeMobileMenu}>
          Elec Data
        </Link>
      )
    );
  };
  const TempHistory = () => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
      return <div>Loading ...</div>;
    }

    return (
      isAuthenticated && (
        <NavLink to="/Temps" className="nav-links" onClick={closeMobileMenu}>
          Temp History
        </NavLink>
      )
    );
  };
  // const CreateCust = () => {
  //   const { isAuthenticated, isLoading } = useAuth0();

  //   if (isLoading) {
  //     return <div>Loading ...</div>;
  //   }

  //   return (
  //     isAuthenticated && (
  //       <NavLink
  //         to="/CreateCust"
  //         className="nav-links"
  //         onClick={closeMobileMenu}
  //       >
  //         Create Cust
  //       </NavLink>
  //     )
  //   );
  // };
  const Logs = () => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
      return <div>Loading ...</div>;
    }

    return (
      isAuthenticated && (
        <NavLink to="/Logs" className="nav-links" onClick={closeMobileMenu}>
          Logs
        </NavLink>
      )
    );
  };
  const Boost = () => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
      return <div>Loading ...</div>;
    }

    return (
      isAuthenticated && (
        <NavLink to="/Boost" className="nav-links" onClick={closeMobileMenu}>
          Boost
        </NavLink>
      )
    );
  };
  const InputProfile = () => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
      return <div>Loading ...</div>;
    }

    return (
      isAuthenticated && (
        <Link
          to="/InputProfile"
          className="nav-links"
          onClick={closeMobileMenu}
        >
          Input Profile
        </Link>
      )
    );
  };
  const AllData = () => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
      return <div>Loading ...</div>;
    }

    return (
      isAuthenticated && (
        <Link to="/AllData" className="nav-links" onClick={closeMobileMenu}>
          All Data
        </Link>
      )
    );
  };
  const TestData = () => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
      return <div>Loading ...</div>;
    }

    return (
      isAuthenticated && (
        <Link to="/TestData" className="nav-links" onClick={closeMobileMenu}>
          Test Data
        </Link>
      )
    );
  };

  const Prices = () => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
      return <div>Loading ...</div>;
    }

    return (
      isAuthenticated && (
        <Link to="/Prices" className="nav-links" onClick={closeMobileMenu}>
          Prices
        </Link>
      )
    );
  };

  // const CostCompare = () => {
  //   const { isAuthenticated, isLoading } = useAuth0();

  //   if (isLoading) {
  //     return <div>Loading ...</div>;
  //   }

  //   return (
  //     isAuthenticated && (
  //       <Link to="/CostCompare" className="nav-links" onClick={closeMobileMenu}>
  //         Cost Compare
  //       </Link>
  //     )
  //   );
  // };
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  console.log(button);
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
            {/* <li className="nav-item">
              <TempHistory />
            </li> */}
            <li className="nav-item">
              <AllData />
            </li>
            {/* <li className="nav-item">
              <CostCompare />
            </li> */}
            <li className="nav-item">
              <Boost />
            </li>
            <li className="nav-item">
              <TempHistory />
            </li>
            <li className="nav-item">
              <Logs />
            </li>
            <li className="nav-item">
              <Prices />
            </li>
            {/* <li className="nav-item">
              <ElecLink />
            </li> */}
            <li className="nav-item">
              <LoginButton />
            </li>
            <li className="nav-item">
              <LogoutButton />
            </li>
            <li className="nav-item">
              <Profile />
            </li>
          </ul>
          {/* {button && <Button buttonStyle="btn--outline">SIGN UP</Button>} */}
        </div>
      </nav>
    </>
  );
}

export default Navbar;

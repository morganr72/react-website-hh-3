import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Temps from "./components/pages/Temps";
import Commands from "./components/pages/Commands";
import DevHealth from "./components/pages/DevHealth";
import Prices from "./components/pages/Prices";
import InputProfile from "./components/pages/InputProfile";
import { useAuth0 } from "@auth0/auth0-react";

import "./App.css";

function App() {
  const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return <button onClick={() => loginWithRedirect()}>Log In</button>;
  };
  const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
      <button
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
        <div>
          {/* <img src={user.picture} alt={user.name} /> */}
          <p>{user.email}</p>
        </div>
      )
    );
  };

  return (
    <>
      <Router>
        <Navbar />
        <LoginButton />
        <LogoutButton />
        <Profile />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/Temps" element={<Temps />} />
          <Route path="/Commands" element={<Commands />} />
          <Route path="/DevHealth" element={<DevHealth />} />
          <Route path="/Prices" element={<Prices />} />
          <Route path="/InputProfile" element={<InputProfile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

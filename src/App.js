import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Temps from "./components/pages/Temps";
import Commands from "./components/pages/Commands";
import AllData from "./components/pages/AllData";
import Prices from "./components/pages/Prices";
import InputProfile from "./components/pages/InputProfile";
import { useAuth0 } from "@auth0/auth0-react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  Grid,
  Box,
  Button,
  Slider,
  Container,
} from "@mui/material";

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
        <Container>
          <Grid container spacing={2}>
            <Grid
              item
              xs={2}
              container
              direction="row"
              alignItems="flex-end"
              justify="center"
            >
              <LoginButton />
            </Grid>
            <Grid
              item
              xs={2}
              container
              direction="row"
              alignItems="flex-end"
              justify="center"
            >
              <LogoutButton />
            </Grid>
            <Grid
              item
              xs={3}
              container
              direction="row"
              alignItems="flex-end"
              justify="center"
            >
              <Profile />
            </Grid>
          </Grid>
        </Container>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/Temps" element={<Temps />} />
          <Route path="/Commands" element={<Commands />} />
          <Route path="/AllData" element={<AllData />} />
          <Route path="/Prices" element={<Prices />} />
          <Route path="/InputProfile" element={<InputProfile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

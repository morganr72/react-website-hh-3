import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Temps from "./components/pages/Temps";
import CostCompare from "./components/pages/CostCompare";
import AllData from "./components/pages/AllData";
import Prices from "./components/pages/Prices";
import InputProfile from "./components/pages/InputProfile";
import CoolingInputProfile from "./components/pages/CoolingInputProfile";
import WaterInputProfile from "./components/pages/WaterInputProfile";
import SimulationData from "./components/pages/SimulationData";
import ElecData from "./components/pages/ElecData";
import CreateCust from "./components/pages/CreateCust";
import Logs from "./components/pages/Logs";
import Boost from "./components/pages/Boost";
import TestData from "./components/pages/TestData";
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
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/Temps" element={<Temps />} />
          <Route path="/CostCompare" element={<CostCompare />} />
          <Route path="/AllData" element={<AllData />} />
          <Route path="/Prices" element={<Prices />} />
          <Route path="/ElecData" element={<ElecData />} />
          <Route path="/InputProfile" element={<InputProfile />} />
          <Route path="/CoolingInputProfile" element={<CoolingInputProfile />} />
          <Route path="/WaterInputProfile" element={<WaterInputProfile />} />
          <Route path="/CreateCust" element={<CreateCust />} />
          <Route path="/Logs" element={<Logs />} />
          <Route path="/Boost" element={<Boost />} />
          <Route path="/TestData" element={<TestData />} />
          <Route path="/SimulationData" element={<SimulationData />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

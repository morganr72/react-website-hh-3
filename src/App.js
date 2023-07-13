import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Temps from "./components/pages/Temps";
import Commands from "./components/pages/Commands";
import DevHealth from "./components/pages/DevHealth";

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/Temps" element={<Temps />} />
          <Route path="/Commands" element={<Commands />} />
          <Route path="/DevHealth" element={<DevHealth />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

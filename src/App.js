import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./home/index";
import Profile from "./profile";
import Search from "./search";
import NavBar from "./NavBar/index.js";

function App() {
  const screen = "labs";
  return (
      <HashRouter>
        <div>
            <NavBar/>
            <div style={{marginTop: 56}}>
              <Routes>
                <Route path="/" element={<Navigate to="/Home" />} />
                <Route path="/Home" element={<Home />} />
                  <Route path="/Profile" element={<Profile />} />
                  <Route path="/Search" element={<Search />} />
              </Routes>
            </div>
        </div>
      </HashRouter>
  );
}

export default App;
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home/index";
import Profile from "./profile";
import Search from "./search";
import NavBar from "./NavBar/index.js";
import ProfileSpecific from "./profile/profileUID/index.js";
import Login from "./login/index.js";

function App() {
  const screen = "labs";
  return (
    <HashRouter>
      <div className="">
        <NavBar />
        <div style={{ marginTop: 56 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/Home" />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Profile/:id" element={<ProfileSpecific />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
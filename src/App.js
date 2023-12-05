import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home/index";
import Profile from "./profile";
import Search from "./search";
import NavBar from "./NavBar/index.js";
import ProfileSpecific from "./profile/profileUID/index.js";
import Login from "./Login/index.js";
import Details from "./Details";
import { Provider } from "react-redux";
import store from "./store";
import RootComponent from "./rootComponent";
import Admin from "./Admin";
import ProtectedRoute from "./protectedSignInRoute";
import ProtectedAdminRoute from "./protectedAdminRoute";

function App() {
  return (
    <Provider store={store}>
      <RootComponent>
        <HashRouter>
          <div>
            <NavBar />
            <div style={{ marginTop: 56 }}>
              <Routes>
                <Route path="/" element={<Navigate to="/Home" />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Profile/:id" element={<ProfileSpecific />} />
                <Route
                  path="/Profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route path="/Search" element={<Search />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Details/:did" element={<Details />} />
                <Route
                  path={"/Admin/*"}
                  element={
                    <ProtectedAdminRoute>
                      <Admin />
                    </ProtectedAdminRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </HashRouter>
      </RootComponent>
    </Provider>
  );
}

export default App;

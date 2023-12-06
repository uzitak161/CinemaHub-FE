import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as userClient from "../MongoDBClients/usersClient";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../Login/reducer";

function NavBar() {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signout = async () => {
    await userClient.signout();
    dispatch(setCurrentUser(null));
    navigate("/login");
  };

  useEffect(() => {}, [currentUser]);
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
      <Link key={"home"} to={`/home`} className="ms-2 navbar-brand">
        CinemaHub
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link key={"home"} to={`/home`} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link key={"profile"} to={`/profile`} className={"nav-link"}>
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link key={"search"} to={`/search`} className="nav-link">
              Search
            </Link>
          </li>
          <li className="nav-item">
            <Link key={"Login"} to={`/login`} className="nav-link">
              Login
            </Link>
          </li>
          {currentUser && (
            <li className="nav-item">
              <button onClick={signout} className="nav-link">
                Sign Out
              </button>
            </li>
          )}
          {currentUser && currentUser.role === "ADMIN" && (
            <li className="nav-item">
              <Link key={"admin"} to={`/admin`} className="nav-link">
                Admin
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;

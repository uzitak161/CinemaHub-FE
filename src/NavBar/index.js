import { Link, useNavigate } from "react-router-dom";
import * as clientUser from "../MongoDBClients/Users/client";
import { useEffect, useState } from "react";
import * as userClient from "../MongoDBClients/Users/client";
import { useDispatch, useSelector } from "react-redux";
import { setAccount } from "../Login/reducer";

function NavBar() {
  const account = useSelector((state) => state.accountReducer.account);
  const dispatch = useDispatch();
  const fetchAccount = async () => {
    const new_account = await clientUser.account();
    if (
      !account ||
      (account.username && new_account.username !== account.username)
    ) {
      console.log("Setting account");
      dispatch(setAccount(new_account));
    }
  };

  const navigate = useNavigate();

  const signout = async () => {
    await userClient.signout();
    dispatch(setAccount(null));
    navigate("/login");
  };

  useEffect(() => {
    fetchAccount();
  }, [account]);
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
          {account && (
            <li className="nav-item">
              <button onClick={signout} className="nav-link">
                Sign Out
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;

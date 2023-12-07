import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css"; // You can create your own CSS file for additional styling
import * as userClient from "../MongoDBClients/usersClient";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState("USER");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const signIn = async () => {
    const response = await userClient.signin(credentials);
    if (response) {
      dispatch(setCurrentUser(response));
      navigate("/home");
    } else {
      alert("Username or password incorrect");
    }
  };
  const signUp = async () => {
    try {
      console.log("Signing up");
      const user = { ...credentials, role: userRole };
      const response = await userClient.signup(user);
      dispatch(setCurrentUser(response));
      navigate("/home");
    } catch (err) {
      alert("Username already taken");
      setCredentials({
        username: "",
        password: "",
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      signIn();
    } else {
      signUp();
    }
  };

  const handleUserRoleRadioChange = (e) => {
    console.log(e.target.id);
    if (e.target.id === "userRadio") {
      setUserRole("USER");
      console.log("User role set to USER");
    } else {
      setUserRole("ADMIN");
      console.log("User role set to ADMIN");
    }
    console.log(userRole);
  };
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                {isLogin ? "Login" : "Sign Up"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group my-2">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    placeholder="Enter your username"
                    value={credentials.username}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        username: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                {!isLogin && (
                  <div>
                    <div className="form-check">
                      <label className="form-check-label" htmlFor={"userRadio"}>
                        User
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        id="userRadio"
                        name={"roleRadio"}
                        onClick={handleUserRoleRadioChange}
                        defaultChecked
                      ></input>
                    </div>
                    <div className="form-check">
                      <label
                        className="form-check-label"
                        htmlFor={"adminRadio"}
                      >
                        Admin
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        id="adminRadio"
                        name={"roleRadio"}
                        onClick={handleUserRoleRadioChange}
                      ></input>
                    </div>
                  </div>
                )}
                <button type="submit" className="btn btn-primary btn-block">
                  {isLogin ? "Login" : "Sign Up"}
                </button>
              </form>
              <p className="text-center mt-3">
                {isLogin ? "New user? " : "Already have an account? "}
                <span
                  className="btn bg-secondary"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Sign up" : "Login"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

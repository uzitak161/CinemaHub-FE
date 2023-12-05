import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css"; // You can create your own CSS file for additional styling
import * as userClient from "../MongoDBClients/usersClient";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const signIn = async () => {
    await userClient.signin(credentials);
    navigate("/home");
  };
  const signUp = async () => {
    try {
      console.log("Signing up");
      await userClient.signup(credentials);
      navigate("/home");
    } catch (err) {
      setError(err.response.data);
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
                <button type="submit" className="btn btn-primary btn-block">
                  {isLogin ? "Login" : "Sign Up"}
                </button>
              </form>
              <p className="text-center mt-3">
                {isLogin ? "New user? " : "Already have an account? "}
                <span className="link" onClick={() => setIsLogin(!isLogin)}>
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

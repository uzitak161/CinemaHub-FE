import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'; // You can create your own CSS file for additional styling

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Handle login or signup logic here
        // TODO: Implement login and signup logic/API call
        console.log(`Username: ${username}, Password: ${password}`);

        // Route to Home page after successful login
        navigate('/');

    };

    return (
        <div className="container-fluid mt-5 main-login">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">
                                {isLogin ? 'Login' : 'Sign Up'}
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group my-2">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
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
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">
                                    {isLogin ? 'Login' : 'Sign Up'}
                                </button>
                            </form>
                            <p className="text-center mt-3">
                                {isLogin ? 'New user? ' : 'Already have an account? '}
                                <span
                                    className="link"
                                    onClick={() => setIsLogin(!isLogin)}
                                >
                                    {isLogin ? 'Sign up' : 'Login'}
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
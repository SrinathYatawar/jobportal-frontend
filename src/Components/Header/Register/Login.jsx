import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State variable for error message

  // Regular expression for password validation
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

  const handleLogin = async () => {
    try {
      if (!passwordPattern.test(password)) {
        setError("Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special symbol.");
        return;
      }
      
      const host = 'https://jobportal-f9io.onrender.com/';
      const response = await axios.post(`${host}api/auth/login`, {
        email: email,
        password: password,
      });

      const accessToken = response.data;
      localStorage.setItem("accessToken", accessToken);

      // Redirect the user to the dashboard page after successful login
      navigate(`/dashboard`);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid email or wrong password"); // Set error message
      } else {
        setError("Login Error. Please try again later.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/3 xl:w-1/4">
        <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>
        {error && ( // Conditionally render error message if it exists
          <div className="text-red-600 mb-4">{error}</div>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Link to="/signup" className="text-blue-500 text-sm">
              Not Registered?
            </Link>
          </div>
          <div>
            <button
              className="w-auto md:w-full bg-blue-500 text-white py-3 px-6 md:py-2 md:px-4 rounded-md mb-2 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

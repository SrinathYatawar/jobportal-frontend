import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State variable for error message

  // Regular expression for password validation
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

  const handleRegister = async () => {
    try {
      if (!passwordPattern.test(password)) {
        setError("Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special symbol.");
        return;
      }
       
      const host = 'https://jobportal-f9io.onrender.com/';
      const response = await axios.post(`${host}api/auth/createuser`, {
        name: name,
        email: email,
        password: password,
      });

      const accessToken = response.data.token;

      // For demonstration, let's log the access token
      console.log(accessToken);

      localStorage.setItem("accessToken", accessToken);

      // Redirect the user to the dashboard page after successful registration
      navigate(`/dashboard`);
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.error) {
        setError(error.response.data.error); // Set error message if it exists in the response
      } else {
        setError("Registration Error. Please try again later.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/3 xl:w-1/4">
        <h1 className="text-3xl font-semibold text-center mb-6">Register</h1>
        {error && ( // Conditionally render error message if it exists
          <div className="text-red-600 mb-4">{error}</div>
        )}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div className="mb-6">
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
        <div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;

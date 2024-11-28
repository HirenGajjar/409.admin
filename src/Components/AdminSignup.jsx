import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api"; // API function for signup

const AdminSignup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await signupUser(username, password); // API call to signup
      console.log("User data:", userData); // Log user data to verify API response

      if (userData.token) {
        // Store token in localStorage (optional)
        localStorage.setItem("authToken", userData.token);
        alert("Signup successful! Please log in.");

        // Ensure the navigate function works and is called
        console.log("Navigating to login page...");
        navigate("/"); // Redirect to the login page after successful signup
      }
    } catch (error) {
      console.error("Signup failed", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen w-full justify-center items-center flex-col bg-gray-100 px-4">
      <h2 className="text-4xl font-semibold text-gray-700 mb-6 text-center sm:text-3xl">
        Admin Signup
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Username:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Signup
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?
          <span
            onClick={() => navigate("/")} // Ensure this route is correct
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;

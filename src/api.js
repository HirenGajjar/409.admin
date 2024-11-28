import axios from "axios";

const API_URL = "https://hiren-409.onrender.com/api/admin";

// Login API
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    console.log("Login Response:", response.data);
    return response.data; // Assuming this returns a token
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Login failed: " + error.message);
  }
};

// Signup API
export const signupUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      username,
      password,
    });
    console.log("Signup Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Signup failed:", error);
    throw new Error("Signup failed: " + error.message);
  }
};

// Fetch messages API
export const fetchMessages = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/messages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Messages Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch messages", error);
    throw new Error("Failed to fetch messages: " + error.message);
  }
};

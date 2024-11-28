import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMessages } from "../api.js";

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString(); // Adjust based on actual date field
};

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/"); // Redirect to login if token doesn't exist
    } else {
      const getMessages = async () => {
        try {
          setLoading(true);
          const data = await fetchMessages(token); // Fetch messages here

          console.log("Messages from API:", data);

          if (data && data.length > 0) {
            setMessages(data); // Set messages directly as the array is returned
          } else {
            setError("No messages available.");
          }
        } catch (error) {
          setError("Failed to fetch messages");
        } finally {
          setLoading(false);
        }
      };
      getMessages();
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <button
        onClick={handleLogout}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
      >
        Logout
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <h3 className="text-xl font-semibold mb-4">Messages:</h3>

      {messages.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b text-left">Name</th>
                <th className="px-4 py-2 border-b text-left">Email</th>
                <th className="px-4 py-2 border-b text-left">Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{message.name}</td>
                  <td className="px-4 py-2 border-b">{message.email}</td>
                  <td className="px-4 py-2 border-b">{message.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No messages available</p>
      )}
    </div>
  );
};

export default Dashboard;

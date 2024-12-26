import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    try {
      // Send a request to the backend to reset the password
      const response = await axios.post(
        `http://localhost:5000/api/v1/auth/reset-password/${token}`, // Use the reset token in the URL
        {
          email: formData.email,
          password: formData.newPassword,
          confirm_password: formData.confirmPassword,
        }
      );
      setMessage(response.data.msg); // Assuming the backend sends a success message
      navigate("/");
    } catch (error) {
      // Handle error response
      if (error.response && error.response.data && error.response.data.msg) {
        setMessage(error.response.data.msg); // Show error message from backend
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      {message && (
        <p
          className={`mb-4 ${
            message.includes("successful") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
      {/* <input
        type="email"
        name="email"
        placeholder="Enter your email"
        className="block w-full p-2 mb-4 border rounded"
        onChange={handleChange}
        required
      /> */}
      <input
        type="password"
        name="newPassword"
        placeholder="Enter new password"
        className="block w-full p-2 mb-4 border rounded"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm new password"
        className="block w-full p-2 mb-4 border rounded"
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Reset Password
      </button>
    </form>
  );
};

export default ResetPassword;

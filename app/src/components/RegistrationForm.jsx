import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "male",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate(); // Hook to handle page navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    setIsLoading(true);

    try {
      // Make the registration request to the backend
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          gender: formData.gender,
          password: formData.password,
        }
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        gender: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/");
    } catch (error) {
      console.log(error);

      // Handle errors
      if (error.response && error.response.data) {
        setMessage(error.response.data.msg || "An error occurred.");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white shadow rounded"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {message && (
        <p
          className={`mb-4 ${
            message.includes("successful") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="block w-full p-2 mb-4 border rounded"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="block w-full p-2 mb-4 border rounded"
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        className="block w-full p-2 mb-4 border rounded"
        onChange={handleChange}
        required
      />
      <select
        name="gender"
        className="block w-full p-2 mb-4 border rounded"
        onChange={handleChange}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="block w-full p-2 mb-4 border rounded"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        className="block w-full p-2 mb-4 border rounded"
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded"
        disabled={isLoading}
      >
        {isLoading ? "Please wait..." : "Register"}
      </button>
    </form>
  );
};

export default RegistrationForm;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing (React Router v6)
import { setCredientials } from "../slices/authSllice";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Hook to handle page navigation
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(false);

    try {
      // Make the login request to the backend
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        {
          identifier: formData.identifier,
          password: formData.password,
        },
        { withCredentials: true }
      );

      // Handle successful login
      setMessage("Login successful!");
      setIsLoading(false);
      console.log(res);

      // Store the token in localStorage or a global state (if required)
      dispatch(setCredientials(res.data.user));

      // Navigate to a different page after login
      navigate("/dashboard");
    } catch (error) {
      // Handle login errors
      setMessage(
        error.response?.data?.msg ||
          "Invalid login credentials. Please try again."
      );
      setIsLoading(false);
    }
  };

  const navigateToForgotPassword = () => {
    navigate("/forgot-password"); // Redirect to Forgot Password page
  };

  const navigateToRegister = () => {
    navigate("/register"); // Redirect to Register page
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <input
        type="text"
        name="identifier"
        placeholder="Email or Name"
        className="block w-full p-2 mb-4 border rounded"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="block w-full p-2 mb-4 border rounded"
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Login
      </button>
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={navigateToForgotPassword}
          className="text-blue-500"
        >
          Forgot Password?
        </button>
        <button
          type="button"
          onClick={navigateToRegister}
          className="text-blue-500"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default Login;

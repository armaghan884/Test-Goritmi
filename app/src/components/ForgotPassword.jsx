import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/forgot-password",
        {
          email,
        }
      );

      setMessage(res.data.msg);
      setEmail(""); // Navigate to the reset password page
    } catch (error) {
      // Handle error from the backend
      if (error.response && error.response.data && error.response.data.msg) {
        setMessage(error.response.data.msg || "Something went wrong."); // Show backend error message
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
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
        type="email"
        name="email"
        placeholder="Enter your registered email"
        className="block w-full p-2 mb-4 border rounded"
        onChange={(e) => setEmail(e.target.value)}
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

export default ForgotPassword;

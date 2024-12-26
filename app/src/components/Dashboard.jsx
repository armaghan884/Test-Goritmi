import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSllice";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await axios.get("http://localhost:5000/api/v1/auth/logout", {
        withCredentials: true,
      }); // Update with your backend route

      navigate("/", { replace: true });
      dispatch(logout());
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user data from the server
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/user/", {
          withCredentials: true,
        }); // Update with your backend route
        console.log(response);

        setUser(response.data.user); // Assuming the API sends user data in the `user` field
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return <p className="text-center text-red-500">Please wait...</p>;
  }
  if (!user) {
    return <p className="text-center text-red-500">No user is logged in.</p>;
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Gender:</strong> {user.gender}
      </p>
      <button onClick={logoutHandler} className="block mt-4 text-blue-500">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;

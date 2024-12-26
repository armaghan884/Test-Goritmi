import { logoutUser } from "./helpers/auth";

const Logout = () => {
  const handleLogout = () => {
    logoutUser();
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={handleLogout}
        className="bg-blue-500 text-white py-2 px-4 rounded shadow"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;

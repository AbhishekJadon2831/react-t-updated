import { useAuth } from "../../context/Authcontext";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <p className="text-lg font-medium">Please log in to view your profile.</p>
      </div>
    );
  }

  function log() {
    logout("");
    navigate("/login");
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-800"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-3xl shadow-2xl p-8 transition duration-300 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        
        <div className="flex items-center space-x-5 mb-6">
          <img
            className="w-24 h-24 rounded-full border-4 border-gradient-to-br from-blue-400 to-purple-500 shadow-lg object-cover"
            src={user.avatar || "https://i.pravatar.cc/150?u=user"}
            alt="User avatar"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.name || "Your Name"}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="font-medium text-blue-500">Username:</span>
            <span>{user.username || "Not set"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-purple-500">Phone:</span>
            <span>{user.phone || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-pink-500">Role:</span>
            <span>{user.role || "User"}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 space-y-4">
          <button
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow hover:scale-105 transition-transform"
          >
            ✏️ Edit Profile
          </button>
          <button
            onClick={log}
            className="w-full py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl shadow hover:scale-105 transition-transform"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;

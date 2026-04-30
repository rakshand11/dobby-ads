import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-blue-600">📁 Dobby Drive</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Hi, {user?.name}</span>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-50 text-red-500 px-4 py-1.5 rounded-lg hover:bg-red-100 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

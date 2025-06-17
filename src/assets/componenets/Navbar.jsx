import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { ShoppingCart, Star, Heart, Eye, Plus, Check, Filter, Search, Moon, Sun } from "lucide-react";

function Navbar() {
  const { theme, toogleTheme } = useTheme();
  

  return (
    <header className={`shadow-md ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>

      <nav className="container mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wider">🌐 MyWebsite</h1>


        {/* Links */}
        <ul className="flex flex-wrap gap-6 text-lg font-medium">

          <li>
            <Link to="/Home" className="hover:text-yellow-300 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/Register" className="hover:text-yellow-300 transition duration-300">
              Register
            </Link>
          </li>
          <li>
            <Link to="/Login" className="hover:text-yellow-300 transition duration-300">
              Login
            </Link>
          </li>
          <li>
            <Link to="/Profile" className="hover:text-yellow-300 transition duration-300">
              Profile
            </Link>
          </li>



          <li>
            <Link to="/Card" className="hover:text-yellow-300 transition duration-300">
              Card
            </Link>
          </li>
        </ul>

        {/* Theme Toggle Button */}
        <button
          onClick={toogleTheme}
                className={`p-3 rounded-full transition-colors ${
                  theme === 'light' 
                    ? 'bg-yellow-100 hover:bg-yellow-200' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
        >
          {theme === 'light' ? (
            <Moon className="w-6 h-6 text-yellow-600" />
          ) : (
            <Sun className="w-6 h-6 text-yellow-400" />
          )}
        </button>
      </nav>

    </header>
  );
}

export default Navbar;

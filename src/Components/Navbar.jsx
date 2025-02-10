import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeProvider";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
    const { user, logOutUser } = useAuth();
    const { theme, toggleTheme } = useContext(ThemeContext);

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `font-bold transition duration-300 ${
                            isActive ? "text-green-400" : "text-white hover:text-green-400"
                        }`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/availableFoods"
                    className={({ isActive }) =>
                        `font-bold transition duration-300 ${
                            isActive ? "text-green-400" : "text-white hover:text-green-400"
                        }`
                    }
                >
                    Available Foods
                </NavLink>
            </li>
            {user && (
                <>
                    <li>
                        <NavLink
                            to="/addFood"
                            className={({ isActive }) =>
                                `font-bold transition duration-300 ${
                                    isActive ? "text-green-400" : "text-white hover:text-green-400"
                                }`
                            }
                        >
                            Add Food
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/myFood"
                            className={({ isActive }) =>
                                `font-bold transition duration-300 ${
                                    isActive ? "text-green-400" : "text-white hover:text-green-400"
                                }`
                            }
                        >
                            My Food
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/myRequest"
                            className={({ isActive }) =>
                                `font-bold transition duration-300 ${
                                    isActive ? "text-green-400" : "text-white hover:text-green-400"
                                }`
                            }
                        >
                            My Request
                        </NavLink>
                    </li>
                </>
            )}
            {!user && (
                <li>
                    <NavLink
                        to="/register"
                        className={({ isActive }) =>
                            `font-bold transition duration-300 ${
                                isActive ? "text-green-400" : "text-white hover:text-green-400"
                            }`
                        }
                    >
                        Register
                    </NavLink>
                </li>
            )}
        </>
    );

    return (
        <nav className="bg-gradient-to-r from-green-700 to-teal-600 fixed top-0 w-full z-50 shadow-md">
            <div className="navbar container mx-auto px-6 flex justify-between items-center py-4">
                
                {/* Left: Logo */}
                <div className="navbar-start">
                    <a className="text-2xl font-bold text-white tracking-wide">
                        FOODSHARE HUB
                    </a>
                </div>

                {/* Center: Navigation Links */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-6">{links}</ul>
                </div>

                {/* Right: Theme Toggle & Auth */}
                <div className="navbar-end flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full transition-all duration-300 bg-gray-900 hover:bg-gray-700 text-green-400"
                    >
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>

                    {user && user?.email ? (
                        <div className="flex items-center gap-2 text-white" title={user?.displayName}>
                            <img
                                className="w-10 h-10 rounded-full border border-green-400"
                                src={user?.photoURL || "https://via.placeholder.com/150"}
                                alt={user?.displayName || "User"}
                            />
                            <button
                                onClick={logOutUser}
                                className="px-4 py-2 bg-gray-900 text-white rounded-lg border border-green-400 hover:bg-green-400 hover:text-gray-900 transition duration-300"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <NavLink
                            to="/login"
                            className="px-4 py-2 bg-green-400 text-gray-900 font-bold rounded-lg hover:bg-green-500 transition duration-300"
                        >
                            Login
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

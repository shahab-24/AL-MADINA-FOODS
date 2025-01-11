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
                        `font-bold ${
                            isActive ? "text-accentLight dark:text-accentDark" : "text-gray-800 dark:text-gray-200"
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
                        `font-bold ${
                            isActive ? "text-accentLight dark:text-accentDark" : "text-gray-800 dark:text-gray-200"
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
                                `font-bold ${
                                    isActive ? "text-accentLight dark:text-accentDark" : "text-gray-800 dark:text-gray-200"
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
                                `font-bold ${
                                    isActive ? "text-accentLight dark:text-accentDark" : "text-gray-800 dark:text-gray-200"
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
                                `font-bold ${
                                    isActive ? "text-accentLight dark:text-accentDark" : "text-gray-800 dark:text-gray-200"
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
                            `font-bold ${
                                isActive ? "text-accentLight dark:text-accentDark" : "text-gray-800 dark:text-gray-200"
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
        <nav className="bg-purple-700 text-white fixed top-0 w-full z-50 shadow-md">
<div className="navbar py-4 fixed top-0 bg-purple-700  w-full shadow-md z-10 h-[100px] mb-30"   style={{ height: "4rem" }} >
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {links}
                    </ul>
                </div>
                <a className="text-lg lg:text-xl text-gray-800 dark:text-gray-100 lg:btn-ghost">AL-MADINA FOODS</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>
            <div className="navbar-end">
                <button
                    onClick={toggleTheme}
                    className={`p-2 mr-1 rounded-full ${
                        theme === "light" ? "bg-accentLight" : "bg-accentDark"
                    } text-white`}
                >
                    {theme === "light" ? "🌙" : "☀️"}
                </button>
                {user && user?.email ? (
                    <div className="flex items-center gap-2" title={user?.displayName}>
                        <img
                            className="w-10 hidden h-10 sm:w-12 sm:h-12 rounded-full border border-cyan-400"
                            src={user?.photoURL || "https://via.placeholder.com/150"}
                            alt={user?.displayName || "User"}
                            
                        />
                        <button onClick={logOutUser} className="btn btn-outline bg-transparent">
                            Logout
                        </button>
                    </div>
                ) : (
                    <NavLink to="/login" className="btn btn-outline">
                        Login
                    </NavLink>
                )}
            </div>
        </div>
        </nav>
        
    );
};

export default Navbar;
import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeProvider";
import useAuth from "../Hooks/useAuth";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const { user, logOutUser, setUser, setErr, setLoading } = useAuth();
    const navigate = useNavigate()
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

    const handleLogOutUser = () => {
        
        setLoading(true)
        logOutUser()
              .then(() => {
                setUser(null);
                navigate('/')
              })
              .catch((error) => {
                setErr(error.message);
              })
              .finally(()=> {
                setLoading(false)})
                
              
    }

    return (
        <nav className={`bg-green-700 fixed top-0 w-screen z-50 shadow-md ${theme === "dark" ? "dark:bg-gray-900" : ""}`}>
            {/* Navbar Container */}
            <div className="container mx-auto px-6 flex justify-between items-center py-4">
                {/* Logo */}
                <NavLink to="/" className="text-lg md:text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-green-400 to-teal-400 bg-clip-text text-transparent tracking-wider">
                    FOODSHARE HUB
                </NavLink>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-6">
                    <ul className="flex space-x-6 text-white font-bold">
                        <li><NavLink to="/" className={({ isActive }) => isActive ? "text-green-400" : "hover:text-green-400"}>Home</NavLink></li>
                        <li><NavLink to="/availableFoods" className={({ isActive }) => isActive ? "text-green-400" : "hover:text-green-400"}>Available Foods</NavLink></li>
                        {user && (
                            <>
                                <li><NavLink to="/addFood" className={({ isActive }) => isActive ? "text-green-400" : "hover:text-green-400"}>Add Food</NavLink></li>
                                <li><NavLink to="/myFood" className={({ isActive }) => isActive ? "text-green-400" : "hover:text-green-400"}>My Food</NavLink></li>
                                <li><NavLink to="/myRequest" className={({ isActive }) => isActive ? "text-green-400" : "hover:text-green-400"}>My Request</NavLink></li>
                            </>
                        )}
                        {!user && <li><NavLink to="/register" className={({ isActive }) => isActive ? "text-green-400" : "hover:text-green-400"}>Register</NavLink></li>}
                    </ul>
                </div>

                {/* Right Side (Theme Toggle, Auth, Mobile Menu Button) */}
                <div className="flex items-center space-x-4">
                    {/* Theme Toggle Button */}
                    <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-900 hover:bg-gray-700 text-green-400">
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>

                    {/* User Authentication */}
                    {user ? (
                        <button onClick={logOutUser} className="hidden lg:block bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-green-400 hover:text-gray-900 transition">Logout</button>
                    ) : (
                        <NavLink to="/login" className="hidden lg:block bg-green-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-green-500 transition">Login</NavLink>
                    )}

                    {/* Mobile Menu Toggle Button */}
                    <button onClick={handleMenuToggle} className="lg:hidden text-white text-2xl">
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden fixed top-0 left-0 w-[60%] h-[80%] bg-green-700 text-white z-40 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out p-6`}>
                {/* <button onClick={handleMenuToggle} className="absolute top-4 right-4 text-2xl">
                    <FaTimes />
                </button> */}

                <ul className="flex flex-col space-y-2 mt-10 text-sm font-semibold">
                    <li><NavLink to="/" onClick={handleMenuToggle} className="hover:text-green-300">Home</NavLink></li>
                    <li><NavLink to="/availableFoods" onClick={handleMenuToggle} className="hover:text-green-300">Available Foods</NavLink></li>
                    {user && (
                        <>
                            <li><NavLink to="/addFood" onClick={handleMenuToggle} className="hover:text-green-300">Add Food</NavLink></li>
                            <li><NavLink to="/myFood" onClick={handleMenuToggle} className="hover:text-green-300">My Food</NavLink></li>
                            <li><NavLink to="/myRequest" onClick={handleMenuToggle} className="hover:text-green-300">My Request</NavLink></li>
                        </>
                    )}
                    {!user && <li><NavLink to="/register" onClick={handleMenuToggle} className="hover:text-green-300">Register</NavLink></li>}
                </ul>

                {/* User Section in Mobile Menu */}
                {user ? (
                    <div className="flex flex-row space-x-1 items-center mt-4">
                        <img className="w-10 h-10 rounded-full border border-green-400" src={user?.photoURL || "https://via.placeholder.com/150"} alt={user?.displayName || "User"} />
                        <button onClick={handleLogOutUser} className="px-4 btn-sm py-2 bg-gray-900 text-white rounded-lg border border-green-400 hover:bg-green-400 hover:text-gray-900 transition">Logout</button>
                    </div>
                ) : (
                    <NavLink to="/login" className="block btn-sm text-center mt-4 px-4 py-2 bg-green-400 text-gray-900 font-bold rounded-lg hover:bg-green-500 transition">Login</NavLink>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

import { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import useAuth from "../Hooks/useAuth";
import { Link } from "react-router-dom";
import { BsSun, BsMoon } from "react-icons/bs"; // Light/Dark mode icons

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [isThreeColumn, setIsThreeColumn] = useState(true);
  const [locationFilter, setLocationFilter] = useState("");
  const [expireFilter, setExpireFilter] = useState("");
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const { user } = useAuth();

  useEffect(() => {
    AOS.init({ duration: 1200 });

    axios
      .get("http://localhost:3000/available-foods")
      .then((result) => {
        // Sort by expiration date (soonest first)
        const sortedFoods = result.data.sort(
          (a, b) => new Date(a.expireDate) - new Date(b.expireDate)
        );

        setFoods(sortedFoods);
        setFilteredFoods(sortedFoods);
      })
      .catch((error) => console.log(error.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let searchedFoods = foods.filter((food) =>
      food?.foodName?.toLowerCase().includes(searchText.toLowerCase())
    );

    if (locationFilter) {
      searchedFoods = searchedFoods.filter(
        (food) => food.pickupLocation === locationFilter
      );
    }

    if (expireFilter) {
      searchedFoods = searchedFoods.filter(
        (food) => new Date(food.expireDate) <= new Date(expireFilter)
      );
    }

    setFilteredFoods(searchedFoods);
  }, [searchText, locationFilter, expireFilter, foods]);

  // Theme Toggle Function
//   const toggleTheme = () => {
//     const newTheme = theme === "dark" ? "light" : "dark";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//   };

  return (
    <div
//       className={`min-h-screen p-6 transition-all ${
//         theme === "dark" ? "bg-gray-950 text-gray-200" : "bg-gray-100 text-gray-900"
//       }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-center flex-1 mt-20 text-green-600 ">Available Foods</h1>

        {/* Dark/Light Mode Toggle */}
        {/* <button
          onClick={toggleTheme}
          className="text-xl p-2 rounded-lg transition bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-black"
        >
          {theme === "dark" ? <BsSun /> : <BsMoon />}
        </button> */}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="search"
          value={searchText}
          placeholder="Search foods..."
          className="bg-gray-800 border-2 border-cyan-500 w-full sm:w-[40%] rounded-xl py-2 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-600 transition dark:bg-gray-200 dark:text-gray-900"
        />

        {/* Location Filter */}
        <select
          onChange={(e) => setLocationFilter(e.target.value)}
          className="bg-gray-800 border-2 border-cyan-500 w-full sm:w-auto rounded-xl py-2 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-600 dark:bg-gray-200 dark:text-gray-900"
        >
          <option value="">Filter by Location</option>
          {[...new Set(foods.map((food) => food.pickupLocation))].map(
            (location) => (
              <option key={location} value={location}>
                {location}
              </option>
            )
          )}
        </select>

        {/* Expiry Date Filter */}
        <input
          type="date"
          onChange={(e) => setExpireFilter(e.target.value)}
          className="bg-gray-800 border-2 border-cyan-500 w-full sm:w-auto rounded-xl py-2 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-600 dark:bg-gray-200 dark:text-gray-900"
        />

        <button
          onClick={() => setIsThreeColumn(!isThreeColumn)}
          className="bg-green-500 text-white py-2 px-6 rounded-xl hover:bg-cyan-600 transition"
        >
          {isThreeColumn ? "Switch to Two Columns" : "Switch to Three Columns"}
        </button>
      </div>

      {/* Food Cards */}
      <div
        className={`grid gap-8 ${
          isThreeColumn
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2"
        }`}
      >
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg shadow-lg p-4 animate-pulse dark:bg-gray-300"
              >
                <div className="h-48 bg-gray-700 rounded"></div>
                <div className="h-6 bg-gray-600 mt-4 w-3/4 rounded"></div>
                <div className="h-4 bg-gray-600 mt-2 w-1/2 rounded"></div>
                <div className="h-4 bg-gray-600 mt-2 w-1/4 rounded"></div>
                <div className="h-12 bg-gray-700 mt-4 rounded"></div>
              </div>
            ))
          : filteredFoods.map((food, index) => (
              <div
                key={food._id}
                className="rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform flex flex-col dark:bg-gray-900 bg-white"
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                style={{ minHeight: "380px" }}
              >
                <img
                  src={food.foodImage}
                  alt={food.foodName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex-grow">
                  <h2 className="text-2xl font-bold mb-2 dark:text-gray-100 text-gray-900">
                    {food.foodName}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Quantity:</strong> {food.foodQuantity}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Location:</strong> {food.pickupLocation}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Expires:</strong>{" "}
                    {new Date(food.expireDate).toLocaleString()}
                  </p>
                </div>
                <div className="p-4">
                  <Link to={`/food-details/${food._id}`}>
                    <button className="w-full px-6 py-3 text-white rounded-lg text-lg font-semibold shadow-md transition duration-300 transform bg-green-600 hover:bg-green-700 hover:shadow-lg">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default AvailableFoods;

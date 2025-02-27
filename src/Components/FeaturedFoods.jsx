import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FeaturedFoods = () => {
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://al-madina-foods-server.vercel.app/featured-foods")
      .then((result) => {
        setFeaturedFoods(result.data);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false); // Stop loading after data is fetched
      });
  }, []);

  return (
    <div className="relative z-10 min-h-screen px-6 md:px-12 lg:px-24 xl:px-32 py-10 bg-gray-100 dark:bg-gray-900 mt-10 lg:mt-[40px]">
      {/* Section Title */}
      <motion.h2
        className="text-4xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12 tracking-wide font-[Poppins]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🍽️ Featured Foods
      </motion.h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {loading
          ? // Show skeleton loader while loading
            [...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5"
              >
                <div className="skeleton h-48 w-full rounded-md mb-4"></div>
                <div className="skeleton h-6 w-3/4 mb-2"></div>
                <div className="skeleton h-4 w-1/2 mb-2"></div>
                <div className="skeleton h-4 w-2/3 mb-2"></div>
                <div className="skeleton h-4 w-1/3 mb-2"></div>
                <div className="skeleton h-4 w-2/3"></div>
              </div>
            ))
          : // Show actual data when loading is finished
            featuredFoods.map((food, index) => (
              <motion.div
                key={food._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 transform transition-transform hover:scale-105 hover:shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img
                  src={food?.foodImage || "default-image.jpg"}
                  alt={food.foodName}
                  className="w-full h-48 object-cover rounded-md mb-4 shadow-md"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {food.foodName || "N/A"}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  Quantity:{" "}
                  <span className="font-medium">
                    {food.foodQuantity || "N/A"}
                  </span>
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  Location:{" "}
                  <span className="font-medium">
                    {food.pickupLocation || "N/A"}
                  </span>
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  Expires:{" "}
                  <span className="font-medium">
                    {new Date(food.expireDate).toLocaleDateString() || "N/A"}
                  </span>
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Donator:{" "}
                  <span className="font-medium">
                    {food.foodUser?.donatorEmail || "N/A"}
                  </span>
                </p>
              </motion.div>
            ))}
      </div>

      {/* "See All" Button */}
      <motion.div className="text-center mt-12">
        <Link to="/availableFoods">
          <motion.button
            className="px-4 py-2 lg:px-6 lg:py-3 text-white rounded-lg text-sm lg:text-lg font-semibold shadow-md transition duration-300 transform bg-green-600 hover:bg-green-700 hover:shadow-lg "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            All Available Foods ➡️
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default FeaturedFoods;

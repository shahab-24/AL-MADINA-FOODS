import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const RecentlyAddedFoods = () => {
  const [recentFoods, setRecentFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentFoods = async () => {
      try {
        const response = await axios.get("http://localhost:3000/recent-foods");
        setRecentFoods(response.data);
      } catch (error) {
        console.error("Error fetching recent foods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentFoods();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] py-14 px-6 sm:px-10 lg:px-20">
      {/* Section Title */}
      <motion.h2
        className="text-4xl font-bold text-white text-center mb-10 tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🍽️ Recently Added Foods
      </motion.h2>

      {/* Food Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {loading
          ? // Loading Skeleton Cards
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white/80 p-5 rounded-lg shadow-lg">
                <div className="skeleton h-40 w-full rounded-md"></div>
                <div className="skeleton h-6 w-3/4 mt-3"></div>
                <div className="skeleton h-4 w-1/2 mt-2"></div>
                <div className="skeleton h-4 w-2/3 mt-2"></div>
                <div className="skeleton h-4 w-1/2 mt-2"></div>
              </div>
            ))
          : recentFoods.length > 0
          ? recentFoods.map((food, index) => (
              <motion.div
                key={food._id}
                className="bg-white/90 rounded-lg shadow-lg p-5 transform transition-transform hover:scale-105"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img
                  src={food.foodImage || "default-food.jpg"}
                  alt={food.foodName}
                  className="w-full h-40 object-cover rounded-md shadow-md"
                />
                <h3 className="text-lg font-semibold text-gray-800 mt-3">
                  {food.foodName || "N/A"}
                </h3>
                <p className="text-gray-600 text-sm">
                  📍 Pickup Location:{" "}
                  <span className="font-medium">{food.pickupLocation || "N/A"}</span>
                </p>
                <p className="text-gray-600 text-sm">
                  🕒 Expires:{" "}
                  <span className="font-semibold text-red-500">{food.expireDate || "N/A"}</span>
                </p>
              </motion.div>
            ))
          : (
            <p className="text-center text-white text-lg">
              No recently added foods available.
            </p>
          )}
      </div>
    </div>
  );
};

export default RecentlyAddedFoods;

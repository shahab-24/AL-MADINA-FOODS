import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const RecentlyAddedFoods = () => {
  const [recentFoods, setRecentFoods] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchRecentFoods = async () => {
      try {
        const response = await axios.get(
          "https://al-madina-foods-server.vercel.app/recent-foods"
        );
        setRecentFoods(response.data);
        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error("Error fetching recent foods:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchRecentFoods();
  }, []);

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-6">
        Recently Added Foods
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="card p-4 bg-white shadow-lg rounded-lg animate-pulse"
            >
              <div className="w-full h-40 bg-gray-300 rounded-md"></div>
              <div className="mt-3 h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))
        ) : recentFoods.length > 0 ? (
          recentFoods.map((food) => (
            <motion.div
              key={food._id}
              className="card p-4 bg-white shadow-lg rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={food.foodImage}
                alt={food.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-xl font-bold mt-3">{food.foodName}</h3>
              <p>Pickup Location: {food.pickupLocation}</p>
              <p className="text-xl font-bold">
                Expire Date:{" "}
                <span className="text-purple-600 font-semibold">
                  {food.expireDate}
                </span>
              </p>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No recently added foods available.
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentlyAddedFoods;

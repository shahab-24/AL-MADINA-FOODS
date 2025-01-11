import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // Import framer-motion
import { Link } from "react-router-dom"; // For "See All" navigation

const FeaturedFoods = () => {
  const [featuredFoods, setFeaturedFoods] = useState([]);

  useEffect(() => {
    axios
      .get("https://al-madina-foods-server.vercel.app/featured-foods")
      .then((result) => {
        setFeaturedFoods(result.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-blue-600 p-8 lg:mt-[140px] lg:mt-50">
      {" "}
      {/* Adjusted margin-top */}
      <h2 className="text-3xl font-semibold text-white text-center mb-8">
        Featured Foods
      </h2>
      {/* Featured Foods Grid with Motion */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {featuredFoods.map((food) => (
          <motion.div
            key={food._id}
            className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={food?.foodImage || "Food Image"}
              alt={food.foodName}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">
              Quantity: {food.foodQuantity || "N/A"}
            </h3>
            <h3 className="text-xl font-semibold mb-2">
              Item Name: {food.foodName || "N/A"}
            </h3>
            <p className="text-gray-700">
              Location: {food.pickupLocation || "N/A"}
            </p>
            <p className="text-gray-700">
              Expires: {new Date(food.expireDate).toLocaleDateString() || "N/A"}
            </p>
            <p className="text-gray-700">
              Donator: {food.foodUser?.donatorEmail || "N/A"}
            </p>
          </motion.div>
        ))}
      </div>
      {/* "See All" Button placed outside the grid */}
      <div className="text-center mt-8">
        <Link to="/availableFoods">
          <motion.button
            className="py-2 px-6 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            See All Available Foods
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedFoods;

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const FoodSlider = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get("https://al-madina-foods-server.vercel.app/featured-foods")
      .then((result) => {
        setFoods(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
      });
  }, []);

  // Slide Navigation Functions
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % foods.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + foods.length) % foods.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  });

  return (
    <div
      className="relative w-full max-w-7xl mx-auto overflow-hidden h-[500px] bg-bannerLight dark:bg-bannerDark transition-all duration-500"
      style={{ marginTop: "4rem", marginBottom: "4rem" }}
    >
      {/* Loading Skeleton */}
      {loading ? (
        <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg">
          <div className="flex justify-center items-center h-full">
            <div className="h-12 w-32 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      ) : (
        <motion.div
          className="flex transition-transform duration-500"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
        >
          {/* Slide Content */}
          {foods.length > 0 && (
            <motion.div
              key={foods[currentIndex]._id}
              className="w-full h-[500px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="relative w-full h-full">
                {/* Image with Animation */}
                <motion.img
                  src={foods[currentIndex].foodImage}
                  alt={foods[currentIndex].foodName}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                />
                {/* Food Name Overlay */}
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-4 rounded-lg">
                  <h3 className="text-2xl font-bold">
                    {foods[currentIndex].foodName}
                  </h3>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Navigation Arrows */}
      <div
        className="relative w-full max-w-7xl mx-auto overflow-hidden h-[500px] bg-bannerLight dark:bg-bannerDark transition-all duration-500 pt-[80px] mt-30"
        onClick={prevSlide}
      >
        <motion.span
          whileHover={{ scale: 1.2, rotate: "-15deg" }}
          whileTap={{ scale: 0.9 }}
          className="text-4xl font-bold"
        >
          &lt;
        </motion.span>
      </div>
      <div
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white p-3 cursor-pointer"
        onClick={nextSlide}
      >
        <motion.span
          whileHover={{ scale: 1.2, rotate: "15deg" }}
          whileTap={{ scale: 0.9 }}
          className="text-4xl font-bold"
        >
          &gt;
        </motion.span>
      </div>
    </div>
  );
};

export default FoodSlider;

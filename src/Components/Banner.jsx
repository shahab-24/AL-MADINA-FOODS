import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const FoodSlider = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/featured-foods")
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
    <div className="relative w-screen h-screen bg-bannerLight dark:bg-bannerDark transition-all duration-500">
      {/* Loading Skeleton */}
      {loading ? (
        <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg">
          <div className="flex justify-center items-center h-full">
            <div className="h-12 w-32 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      ) : (
        <motion.div
          className="flex w-screen h-screen transition-transform duration-500"
          initial={{ x: "100%" }} // Start from the right
          animate={{ x: "0%" }} // Slide into view
          exit={{ x: "-100%" }} // Exit to the left
        >
          {/* Slide Content */}
          {foods.length > 0 && (
            <motion.div
              key={foods[currentIndex]._id}
              className="relative w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {/* Image as Background */}
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${foods[currentIndex].foodImage})`,
                }}
              />
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h3 className="text-3xl md:text-5xl text-white font-bold px-4">
                  {foods[currentIndex].foodName}
                </h3>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Navigation Arrows */}
      <div
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white p-3 cursor-pointer"
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

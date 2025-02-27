import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Banner = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchLocalData = fetch("/FeaturedFoods.json")
      .then((res) => res.json())
      .catch(() => []);

    const fetchMongoData = axios
      .get("https://al-madina-foods-server.vercel.app/featured-foods")
      .then((res) => res.data)
      .catch(() => []);

    Promise.all([fetchLocalData, fetchMongoData])
      .then(([localData, mongoData]) => {
        const combinedData = [...localData, ...mongoData];
        if (combinedData.length > 0) {
          setFoods(combinedData);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
        setLoading(false);
      });
  }, []);

  // ➤ Detect if Banner is in viewport
  useEffect(() => {
    const handleScroll = () => {
      const banner = document.getElementById("banner");
      if (!banner) return;

      const { top, bottom } = banner.getBoundingClientRect();
      const isVisible = top < window.innerHeight && bottom > 0;
      setIsVisible(isVisible);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ➤ Only slide when Banner is visible
  useEffect(() => {
    if (foods.length > 0 && isVisible) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % foods.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [foods, isVisible]);

  return (
    <div
      id="banner"
      className="relative w-full h-[80vh] md:h-screen bg-gray-900 z-0 overflow-hidden"
    >
      {loading ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-300 animate-pulse">
          <div className="h-12 w-32 bg-gray-400 rounded-lg"></div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {foods.length > 0 && (
            <motion.div
              key={foods[currentIndex]._id || currentIndex}
              className="relative w-full h-full"
              initial={{ opacity: 0, x: isVisible ? "100%" : 0 }}
              animate={{ opacity: 1, x: isVisible ? "0%" : 0 }}
              exit={{ opacity: 0, x: isVisible ? "-100%" : 0 }}
              transition={{ duration: 1 }}
            >
              {/* Background Image (Fixed Positioning Issue) */}
              <motion.div
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700"
                style={{
                  backgroundImage: `url(${foods[currentIndex]?.foodImage})`,
                }}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2 }}
              />

              {/* Dark Overlay & Title */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center justify-center">
                <h3 className="text-xl md:text-3xl lg:text-5xl text-white font-extrabold px-6 text-center">
                  {foods[currentIndex].foodName}
                </h3>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Navigation Arrows (Hidden if Only 1 Item) */}
      {foods.length > 1 && (
        <>
          <button
            className="absolute top-1/2 left-6 transform -translate-y-1/2 text-white p-3 bg-gray-800/60 hover:bg-gray-700/80 rounded-full transition duration-300"
            onClick={() =>
              setCurrentIndex(
                (prev) => (prev - 1 + foods.length) % foods.length
              )
            }
          >
            <motion.span
              whileHover={{ scale: 1.2 }}
              className="text-2xl font-bold"
            >
              &lt;
            </motion.span>
          </button>
          <button
            className="absolute top-1/2 right-6 transform -translate-y-1/2 text-white p-3 bg-gray-800/60 hover:bg-gray-700/80 rounded-full transition duration-300"
            onClick={() => setCurrentIndex((prev) => (prev + 1) % foods.length)}
          >
            <motion.span
              whileHover={{ scale: 1.2 }}
              className="text-2xl font-bold"
            >
              &gt;
            </motion.span>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {foods.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {foods.map((_, index) => (
            <div
              key={index}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-green-400 scale-125"
                  : "bg-gray-500"
              }`}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Banner;

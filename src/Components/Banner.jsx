import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Banner = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
        // Fetch from both local JSON and MongoDB
        const fetchLocalData = fetch("/FeaturedFoods.json").then((res) => res.json());
        const fetchMongoData = axios.get("http://localhost:3000/featured-foods").then((res) => res.data);
    
        Promise.all([fetchLocalData, fetchMongoData])
          .then(([localData, mongoData]) => {
            setFoods([...localData, ...mongoData]); // Merging both datasets
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error.message);
            setLoading(false);
          });
      }, []);

//   useEffect(() => {

//         fetch('/FeaturedFoods.json')
//         .then(res => res.json())
//         .then(data => {
//                 setFoods(data)
//                 setLoading(false)
//         })
//     axios
//       .get("http://localhost:3000/featured-foods")// Adjust with your API endpoint
//       .then((result) => {
//         setFoods(result.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error(error.message);
//         setLoading(false);
//       });
//   }, []);

  // Slide Navigation Functions
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % foods.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + foods.length) % foods.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, [foods]);

  return (
    <div className="relative w-screen h-[80vh] md:h-screen bg-gray-900">
      {/* Loading Skeleton */}
      {loading ? (
        <div className="w-full h-full bg-gray-300 animate-pulse rounded-lg flex items-center justify-center">
          <div className="h-12 w-32 bg-gray-400 rounded-lg"></div>
        </div>
      ) : (
        <AnimatePresence>
          {foods.length > 0 && (
            <motion.div
              key={foods[currentIndex]._id}
              className="relative w-full h-full"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 1 }}
            >
              {/* Image Background */}
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700"
                style={{
                  backgroundImage: `url(${foods[currentIndex].foodImage})`,
                }}
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center justify-center">
                <h3 className="text-3xl md:text-5xl text-white font-extrabold px-6 text-center">
                  {foods[currentIndex].foodName}
                </h3>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Navigation Arrows */}
      <button
        className="absolute top-1/2 left-6 transform -translate-y-1/2 text-white p-3 bg-gray-800/60 hover:bg-gray-700/80 rounded-full transition duration-300"
        onClick={prevSlide}
      >
        <motion.span whileHover={{ scale: 1.2 }} className="text-4xl font-bold">
          &lt;
        </motion.span>
      </button>
      <button
        className="absolute top-1/2 right-6 transform -translate-y-1/2 text-white p-3 bg-gray-800/60 hover:bg-gray-700/80 rounded-full transition duration-300"
        onClick={nextSlide}
      >
        <motion.span whileHover={{ scale: 1.2 }} className="text-4xl font-bold">
          &gt;
        </motion.span>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {foods.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-green-400 scale-125" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Banner;

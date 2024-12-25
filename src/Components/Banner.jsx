import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // Import Framer Motion for animation

const FoodSlider = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state to manage the loading skeleton

    useEffect(() => {
        // Fetching food data from the server
        axios
            .get("http://localhost:3000/featured-foods")
            .then((result) => {
                setFoods(result.data); // Set the fetched foods
                setLoading(false); // Stop the loading animation once data is fetched
            })
            .catch((error) => {
                console.log(error.message);
                setLoading(false); // Stop the loading animation if there is an error
            });
    }, []);

    // State to control the index of the currently displayed food item
    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to move to the next slide
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % foods.length);
    };

    // Function to move to the previous slide
    const prevSlide = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + foods.length) % foods.length
        );
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000); // Auto-slide every 3 seconds
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [foods.length]);

    return (
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden h-[400px]">
            {/* If loading, show the skeleton loader */}
            {loading ? (
                <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg">
                    <div className="flex justify-center items-center h-full">
                        <div className="h-12 w-32 bg-gray-300 rounded-lg"></div>
                    </div>
                </div>
            ) : (
                <motion.div
                    className="flex transition-all"
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    {/* Slide Content */}
                    {foods.length > 0 && (
                        <motion.div
                            className="flex-shrink-0 w-full h-[600px]"
                            key={foods[currentIndex]._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <div className="relative w-full h-[600px]">
                                {/* Fixed Image Size with Zoom-out & Flip Animation */}
                                <motion.img
                                    src={foods[currentIndex].foodImage}
                                    alt={foods[currentIndex].foodName}
                                    className="w-full h-[600px] object-cover rounded-lg shadow-lg"
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 1.2 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 20,
                                    }}
                                    whileHover={{
                                        scale: 1.05, // Slight zoom-in on hover
                                        rotateY: 10, // Flip effect on hover
                                    }}
                                    whileTap={{
                                        scale: 0.95, // Scale down on tap
                                    }}
                                />
                                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-3 rounded-lg">
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
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white p-3 cursor-pointer" onClick={prevSlide}>
                <motion.span
                    whileHover={{ scale: 1.2, rotate: "-15deg" }} // Slight rotation on hover
                    whileTap={{ scale: 0.9 }}
                    className="text-4xl font-bold"
                >
                    &lt;
                </motion.span>
            </div>
            <div
                className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white p-3 cursor-pointer"
                onClick={nextSlide}
            >
                <motion.span
                    whileHover={{ scale: 1.2, rotate: "15deg" }} // Slight rotation on hover
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

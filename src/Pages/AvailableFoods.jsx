import { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import useAuth from "../Hooks/useAuth";
import { Link } from "react-router-dom";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [isThreeColumn, setIsThreeColumn] = useState(true); // Toggle for layout
  const { user } = useAuth();

  useEffect(() => {
    AOS.init({ duration: 1200 }); // Initialize AOS with a different duration

    axios
      .get("https://al-madina-foods-server.vercel.app/available-foods")
      .then((result) => {
        setFoods(result.data);
        setFilteredFoods(result.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    const searchedFoods = foods.filter((food) =>
      food?.foodName?.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredFoods(searchedFoods);
  }, [searchText, foods]);

  return (
    <div
      className="min-h-screen bg-gray-900 p-6"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1600279184643-9a4c2b726c9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080)",
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        Available Foods
      </h1>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="search"
          name="searchTerm"
          value={searchText}
          placeholder="Search foods..."
          className="bg-gray-800 border-2 border-cyan-500 w-full sm:w-[40%] rounded-xl py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-600 transition mb-4 sm:mb-0"
        />
        <button
          onClick={() => setIsThreeColumn(!isThreeColumn)}
          className="bg-cyan-500 text-white py-2 px-6 rounded-xl hover:bg-cyan-600 transition"
        >
          {isThreeColumn ? "Switch to Two Columns" : "Switch to Three Columns"}
        </button>
      </div>

      <div
        className={`grid gap-8 ${
          isThreeColumn
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2"
        }`}
      >
        {filteredFoods.map((food, index) => (
          <div
            key={food._id}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform"
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"} // Alternating animations
          >
            <img
              src={food.foodImage}
              alt={food.foodName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold text-white mb-2">
                {food.foodName}
              </h2>
              <p className="text-gray-400 mb-1">
                <strong>Quantity:</strong> {food.foodQuantity}
              </p>
              <p className="text-gray-400 mb-1">
                <strong>Location:</strong> {food.pickupLocation}
              </p>
              <p className="text-gray-400 mb-1">
                <strong>Expires:</strong>{" "}
                {new Date(food.expireDate).toLocaleString()}
              </p>
              <p className="text-gray-500 italic mb-3">
                {food.additionalNotes || "No additional notes provided."}
              </p>
              <div className="flex items-center mb-4">
                <img
                  src={
                    food.foodUser?.donatorImage ||
                    "https://via.placeholder.com/50"
                  }
                  alt="Donator"
                  className="w-12 h-12 rounded-full mr-3"
                />
                <p className="text-sm text-gray-400">
                  {food.foodUser?.donatorEmail}
                </p>
              </div>
              <Link to={`/food-details/${food._id}`}>
                <button className="w-full py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition">
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

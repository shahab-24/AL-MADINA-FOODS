import { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useAuth from '../Hooks/useAuth';
import { Link } from 'react-router-dom';

const AvailableFoods = () => {
    const [foods, setFoods] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [isThreeColumn, setIsThreeColumn] = useState(true); // Toggle for layout
    const { user } = useAuth();

    useEffect(() => {
        AOS.init({ duration: 1000 });

        axios
            .get('http://localhost:3000/available-foods')
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
            className="min-h-screen bg-cover bg-center p-6"
            style={{
                backgroundImage:
                    'url(https://images.unsplash.com/photo-1528690942004-5b2e8ca2ec45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080)',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backgroundBlendMode: 'overlay',
            }}
        >
            <h1 className="text-4xl font-bold text-center mb-8 text-white">Available Foods</h1>

            <div className="flex justify-between items-center mb-4">
                <input
                    onChange={(e) => setSearchText(e.target.value)}
                    type="search"
                    name="searchTerm"
                    value={searchText}
                    placeholder="Search foods..."
                    className="bg-transparent border-2 border-cyan-500 my-4 w-[30%] rounded-xl py-2 px-2 text-white"
                />
                <button
                    onClick={() => setIsThreeColumn(!isThreeColumn)}
                    className="bg-cyan-500 text-white py-2 px-4 rounded hover:bg-cyan-600 transition"
                >
              Change Layout
                </button>
            </div>

            <div
                className={`grid ${
                    isThreeColumn
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                        : 'grid-cols-1 sm:grid-cols-2'
                } gap-6`}
            >
                {filteredFoods.map((food) => (
                    <div
                        key={food._id}
                        className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow"
                        data-aos="fade-up"
                    >
                        <img
                            src={food.foodImage}
                            alt={food.foodName}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h2 className="text-2xl font-semibold mb-2">{food.foodName}</h2>
                        <p className="text-gray-700">Quantity: {food.foodQuantity}</p>
                        <p className="text-gray-700">Location: {food.pickupLocation}</p>
                        <p className="text-gray-700">
                            Expires: {new Date(food.expireDate).toLocaleString()}
                        </p>
                        <p className="text-gray-600 mt-2 italic">{food.additionalNotes}</p>
                        <div className="mt-4 flex items-center">
                            <img
                                src={food.foodUser.donatorImage || 'https://via.placeholder.com/50'}
                                alt="Donator"
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <p className="text-sm text-gray-500">{food.foodUser.donatorEmail}</p>
                        </div>
                        <Link to={`/food-details/${food._id}`}>
                            <button className="w-full mt-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition">
                                View Details
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvailableFoods;

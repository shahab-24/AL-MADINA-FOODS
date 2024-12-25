import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "aos/dist/aos.css";
import AOS from "aos";

const MyFood = () => {
    const { user } = useAuth();
    const loggedInUserEmail = user?.email;

    const [myAddedFood, setMyAddedFood] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null); // For the selected food to edit
    const [showModal, setShowModal] = useState(false);
    const [closingModal, setClosingModal] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS animations with a duration of 1000ms
    }, []);

    useEffect(() => {
        if (!loggedInUserEmail) return;

        axios
            .get(`http://localhost:3000/myFood?userEmail=${loggedInUserEmail}`)
            .then((result) => {
                console.log("My Added Food:", result.data);
                setMyAddedFood(result.data);
            })
            .catch((error) => {
                console.error("Error fetching my added food:", error.message);
            });
    }, [loggedInUserEmail]);

    const handleDeleteFood = (foodId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this food item?");
        if (!confirmDelete) return;

        axios
            .delete(`http://localhost:3000/myFood/${foodId}`)
            .then(() => {
                // Remove the item from the UI
                setMyAddedFood((prev) => prev.filter((food) => food._id !== foodId));
                console.log("Food item deleted successfully");
            })
            .catch((error) => {
                console.error("Error deleting food:", error.message);
            });
    };

    const handleUpdate = (updatedFood) => {
        const { _id, ...rest } = updatedFood; // Exclude _id for the PATCH request
        axios
            .patch(`http://localhost:3000/myFood/${_id}`, rest)
            .then((response) => {
                console.log("Food updated successfully:", response.data);
                // Update the UI instantly
                setMyAddedFood((prev) =>
                    prev.map((food) => (food._id === updatedFood._id ? updatedFood : food))
                );
                closeWithAnimation(); // Close modal with animation
            })
            .catch((error) => {
                console.error("Error updating food:", error.message);
            });
    };

    const handleEditClick = (food) => {
        setSelectedFood(food); // Set the food to be edited
        setShowModal(true); // Show the modal
    };

    const closeWithAnimation = () => {
        setClosingModal(true);
        setTimeout(() => {
            setShowModal(false);
            setClosingModal(false);
        }, 500); // Match the animation duration
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h2 className="text-4xl font-bold mb-6 text-center text-green-600">
                My Added Foods
            </h2>
            {myAddedFood.length === 0 ? (
                <p className="text-gray-600 text-center">
                    You have not added any foods yet.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse shadow-md rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gradient-to-r from-green-400 to-green-600 text-white text-left">
                                <th className="p-4 text-lg font-semibold">Food Name</th>
                                <th className="p-4 text-lg font-semibold">Image</th>
                                <th className="p-4 text-lg font-semibold">Location</th>
                                <th className="p-4 text-lg font-semibold">Quantity</th>
                                <th className="p-4 text-lg font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gradient-to-b from-gray-50 to-gray-100">
                            {myAddedFood.map((food, index) => (
                                <tr
                                    key={food._id}
                                    data-aos={index % 2 === 0 ? "zoom-in" : "zoom-in-up"}
                                    className="hover:bg-green-100 transition-colors border-b border-gray-300"
                                >
                                    <td className="p-4 border-l-4 border-green-500">{food.foodName}</td>
                                    <td className="p-4">
                                        <img
                                            src={food.foodImage || "https://via.placeholder.com/150"}
                                            alt={food.foodName}
                                            className="w-20 h-20 object-cover rounded-md shadow-md"
                                        />
                                    </td>
                                    <td className="p-4">{food.pickupLocation}</td>
                                    <td className="p-4">{food.foodQuantity}</td>
                                    <td className="p-4 text-center flex justify-center space-x-4">
                                        <button
                                            className="text-blue-500 hover:text-blue-700 transition-colors"
                                            onClick={() => handleEditClick(food)}
                                        >
                                            <FaEdit size={20} />
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                            onClick={() => handleDeleteFood(food._id)}
                                        >
                                            <FaTrashAlt size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {/* Modal Code for Edit Feature */}
        </div>
    );
};

export default MyFood;

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
    const [closingModal, setClosingModal] = useState(false); // To handle closing animation

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
                                            onClick={() => console.log("Delete food with ID:", food._id)}
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

            {showModal && selectedFood && (
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
                        closingModal ? "aos-animate" : ""
                    }`}
                    data-aos={closingModal ? "fade-up" : "fade-down"}
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <h3 className="text-2xl font-bold mb-4">Edit Food</h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdate(selectedFood);
                            }}
                        >
                            <div className="mb-4">
                                <label className="block font-medium mb-1">Food Name</label>
                                <input
                                    type="text"
                                    value={selectedFood.foodName}
                                    onChange={(e) =>
                                        setSelectedFood({ ...selectedFood, foodName: e.target.value })
                                    }
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-1">Quantity</label>
                                <input
                                    type="number"
                                    value={selectedFood.foodQuantity}
                                    onChange={(e) =>
                                        setSelectedFood({ ...selectedFood, foodQuantity: e.target.value })
                                    }
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-1">Pickup Location</label>
                                <input
                                    type="text"
                                    value={selectedFood.pickupLocation}
                                    onChange={(e) =>
                                        setSelectedFood({
                                            ...selectedFood,
                                            pickupLocation: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-1">Expire Date</label>
                                <input
                                    type="date"
                                    value={new Date(selectedFood.expireDate).toISOString().split("T")[0]}
                                    onChange={(e) =>
                                        setSelectedFood({
                                            ...selectedFood,
                                            expireDate: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                                    onClick={closeWithAnimation}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyFood;

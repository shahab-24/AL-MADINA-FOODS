import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import axios from "axios";

const MyRequest = () => {
    const [requestedFoods, setRequestedFoods] = useState([]);
    const { user } = useAuth(); // Assuming useAuth provides the logged-in user
    const loggedInUserEmail = user?.email;

    useEffect(() => {
        if (!loggedInUserEmail) return; // Avoid making the request if the user email is not available

        axios
            .get(`http://localhost:3000/myRequest?userEmail=${loggedInUserEmail}`)
            .then((response) => {
                console.log("Requested Foods:", response.data);
                setRequestedFoods(response.data);
            })
            .catch((error) => {
                console.error("Error fetching requested foods:", error.message);
            });
    }, [loggedInUserEmail]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h3 className="text-3xl font-bold mb-4">My Requested Foods</h3>
            {requestedFoods.length === 0 ? (
                <p className="text-gray-600">You have not requested any foods yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {requestedFoods.map((food) => (
                        <div
                            key={food._id}
                            className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow"
                        >
                            <img
                                src={food.foodImage || "https://via.placeholder.com/150"}
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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyRequest;

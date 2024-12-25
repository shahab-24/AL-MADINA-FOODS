import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const FoodDetails = () => {
	const [food, setFood] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [additionalNotes, setAdditionalNotes] = useState("")
	const navigate = useNavigate()
	// console.log(food)
	const {id} = useParams()
	// console.log(id)
	const {user} = useAuth()
	const loggedInUserEmail = user.email

	console.log(loggedInUserEmail)
	useEffect(() => {
		axios.get(`http://localhost:3000/food-details/${id}`)
		.then(result => {
			// console.log(result.data)
			setFood(result.data)
		})
		.catch(error => {
			console.log(error.message)
		})
	}, [id])

	const handleRequestFood=(foodId) => {
		const requestData ={
			foodId: foodId,
			userEmail: loggedInUserEmail,
			requestDate: new Date(),
            // "foodUser.foodStatus": "requested",
			additionalNotes
		}
		// console.log(requestData)

		axios.post("http://localhost:3000/request-food",requestData)
		.then(result => {
			// console.log(result.data)
            setFood(result.data)
		
			navigate('/myRequest')
		setShowModal(false)
		} )
		.catch(error => {
			console.log(error.message)
		})

	}
	return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-4">Food Details</h1>
            <div className="bg-white shadow-md p-6 rounded-lg">
                <img src={food.foodImage} alt={food.foodName} className="w-full h-64 object-cover mb-4" />
                <h2 className="text-2xl font-semibold mb-4">{food.foodName}</h2>
                <p><strong>Quantity:</strong> {food.foodQuantity}</p>
                <p><strong>Pickup Location:</strong> {food.pickupLocation}</p>
                <p><strong>Expires On:</strong> {new Date(food.expireDate).toLocaleString()}</p>
                <p><strong>Notes:</strong> {food.additionalNotes}</p>
                <p><strong>Donator:</strong> {food.foodUser?.donatorEmail || "Unknown"}</p>
                <button
                    onClick={() => setShowModal(true)} // Show modal
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                >
                    Request Food
                </button>
            </div>

            {/* Request Food Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Request Food</h2>
                        <p><strong>Food Name:</strong> {food.foodName}</p>
                        <p><strong>Food ID:</strong> {id}</p>
                        <p><strong>Donator Email:</strong> {food.foodUser?.donatorEmail}</p>
                        <p><strong>User Email:</strong> {loggedInUserEmail}</p>
                        <p><strong>Request Date:</strong> {new Date().toLocaleString()}</p>
                        <textarea
                            placeholder="Add additional notes (optional)"
                            className="w-full border p-2 mt-4"
                            value={additionalNotes}
                            onChange={(e) => setAdditionalNotes(e.target.value)}
                        ></textarea>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setShowModal(false)} // Close modal
                                className="bg-gray-300 px-4 py-2 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={()=>handleRequestFood(food._id)} // Submit request
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Request
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodDetails;
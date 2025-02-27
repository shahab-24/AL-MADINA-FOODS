import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";

const FoodDetails = () => {
  const [food, setFood] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const loggedInUserEmail = user?.email;

  if (!loggedInUserEmail) {
    navigate("/login");
  }

  useEffect(() => {
    axios
      .get(`https://al-madina-foods-server.vercel.app/food-details/${id}`, {
        withCredentials: true,
      })
      .then((result) => {
        setFood(result.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [id]);

  const handleRequestFood = (foodId) => {
    const requestData = {
      foodId: foodId,
      userEmail: loggedInUserEmail,
      requestDate: new Date(),
      additionalNotes,
    };

    axios
      .get(
        `https://al-madina-foods-server.vercel.app/myRequest?userEmail=${loggedInUserEmail}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const userRequest = res.data;
        const alreadyRequestedFood = userRequest.some(
          (item) => item.foodId === foodId
        );
        if (alreadyRequestedFood) {
          Swal.fire({
            icon: "warning",
            title: "Duplicate Request",
            text: `You have already requested the food: ${food.foodName}`,
            confirmButtonColor: "#a855f7", // Custom button color
          });
        } else {
          axios
            .post(
              "https://al-madina-foods-server.vercel.app/request-food",
              requestData,
              {
                withCredentials: true,
              }
            )
            .then((result) => {
              setFood(result.data);
              Swal.fire({
                icon: "success",
                title: "Request Accepted",
                text: `Requested the food: ${food.foodName}, added to your cart`,
                confirmButtonColor: "#a855f7", // Custom button color
              });
              setShowModal(false);
              navigate("/myRequest");
            })
            .catch((error) => {
              console.log(error.message);
            });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          Food Details
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
          <div className="flex flex-col lg:flex-row">
            <img
              src={food.foodImage}
              alt={food.foodName}
              className="w-full lg:w-1/2 h-64 object-cover rounded-lg mb-6 lg:mb-0"
            />
            <div className="lg:ml-6 flex flex-col justify-between">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                {food.foodName}
              </h2>
              <p className="text-gray-600 mb-2">
                <strong>Quantity:</strong> {food.foodQuantity}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Pickup Location:</strong> {food.pickupLocation}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Expires On:</strong>{" "}
                {new Date(food.expireDate).toLocaleString()}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Notes:</strong> {food.additionalNotes || "N/A"}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Donator:</strong>{" "}
                {food.foodUser?.donatorEmail || "Unknown"}
              </p>
              <button
                onClick={() => setShowModal(true)} // Show modal
                className="px-6 py-3 text-white rounded-lg text-lg font-semibold shadow-md transition duration-300 transform bg-green-600 hover:bg-green-700 hover:shadow-lg"
              >
                Request Food
              </button>
            </div>
          </div>
        </div>

        {/* Request Food Modal */}
        {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Request Food
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-2">
        <strong>Food Name:</strong> {food.foodName}
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-2">
        <strong>Food ID:</strong> {id}
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-2">
        <strong>Donator Email:</strong> {food.foodUser?.donatorEmail}
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-2">
        <strong>User Email:</strong> {loggedInUserEmail}
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        <strong>Request Date:</strong> {new Date().toLocaleString()}
      </p>
      <textarea
        placeholder="Add additional notes (optional)"
        className="w-full border border-gray-300 dark:border-gray-600 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 dark:bg-gray-700 dark:text-gray-100"
        value={additionalNotes}
        onChange={(e) => setAdditionalNotes(e.target.value)}
      ></textarea>
      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
        <button
          onClick={() => setShowModal(false)}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={() => handleRequestFood(food._id)}
          className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-800 transition"
        >
          Request
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default FoodDetails;

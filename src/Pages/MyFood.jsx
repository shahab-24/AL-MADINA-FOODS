import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import "aos/dist/aos.css";
import AOS from "aos";

const MyFood = () => {
  const { user } = useAuth();
  const loggedInUserEmail = user?.email;

  const [myAddedFood, setMyAddedFood] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [closingModal, setClosingModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (!loggedInUserEmail) return;

    setLoading(true);
    axios
      .get(
        `https://al-madina-foods-server.vercel.app/myFood?userEmail=${loggedInUserEmail}`,
        {
          withCredentials: true,
        }
      )
      .then((result) => {
        setMyAddedFood(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching my added food:", error.message);
        setLoading(false);
      });
  }, [loggedInUserEmail]);

  const handleDeleteFood = (foodId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this food item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://al-madina-foods-server.vercel.app/myFood/${foodId}`,
            {
              withCredentials: true,
            }
          )
          .then(() => {
            Swal.fire(
              "Deleted!",
              "Your food item has been deleted.",
              "success"
            );
            setMyAddedFood((prev) =>
              prev.filter((food) => food._id !== foodId)
            );
          })
          .catch(() => {
            Swal.fire(
              "Error!",
              "Something went wrong while deleting.",
              "error"
            );
          });
      }
    });
  };

  const handleUpdate = (updatedFood) => {
    const { _id, ...rest } = updatedFood;
    axios
      .patch(`https://al-madina-foods-server.vercel.app/myFood/${_id}`, rest, {
        withCredentials: true,
      })
      .then(() => {
        Swal.fire("Updated!", "Your food item has been updated.", "success");
        setMyAddedFood((prev) =>
          prev.map((food) =>
            food._id === updatedFood._id ? updatedFood : food
          )
        );
        closeWithAnimation();
      })
      .catch(() => {
        Swal.fire("Error!", "Something went wrong while updating.", "error");
      });
  };

  const handleEditClick = (food) => {
    setSelectedFood(food);
    setShowModal(true);
  };

  const closeWithAnimation = () => {
    setClosingModal(true);
    setTimeout(() => {
      setShowModal(false);
      setClosingModal(false);
    }, 500);
  };

  return (
    <div className="min-h-screen pt-10 bg-gradient-to-br from-green-100 via-green-50 to-green-200 p-6">
      <h2
        className="text-3xl text-green-700 md:text-4xl font-bold text-center dark:text-gray-200 mb-6 mt-20"
        data-aos="fade-down"
      >
        My Added Foods
      </h2>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 bg-white shadow rounded-lg"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      ) : myAddedFood.length === 0 ? (
        <p
          className="text-gray-600 text-center text-lg font-medium"
          data-aos="fade-up"
        >
          You have not added any foods yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <h3 className="text-green-500 font-semibold text-xl mb-4">
            My Added Foods: {myAddedFood.length}
          </h3>
          <table className="table-auto w-full border-collapse shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-green-400 to-green-600 text-white text-left">
                <th className="p-4 text-lg font-semibold">Food Name</th>
                <th className="p-4 text-lg font-semibold">Image</th>
                <th className="p-4 text-lg font-semibold">Location</th>
                <th className="p-3 text-gray-900 dark:text-gray-200">
                  Quantity
                </th>
                <th className="p-4 text-lg font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gradient-to-b from-gray-50 to-gray-100 dark:bg-gray-800">
              {myAddedFood.map((food, index) => (
                <tr
                  key={food._id}
                  data-aos={index % 2 === 0 ? "zoom-in" : "zoom-in-up"}
                  className="hover:bg-green-100 dark:hover:bg-gray-700 transition-colors border-b border-gray-300 dark:border-gray-600"
                >
                  <td className="p-4 border-l-4 border-green-500 text-gray-900 dark:text-white">
                    {food.foodName}
                  </td>
                  <td className="p-4">
                    <img
                      src={food.foodImage || "https://via.placeholder.com/150"}
                      alt={food.foodName}
                      className="w-20 h-20 object-cover rounded-md shadow-md"
                    />
                  </td>
                  <td className="p-4 text-gray-900 dark:text-white">
                    {food.pickupLocation}
                  </td>
                  <td className="p-4 text-gray-900 dark:text-white">
                    {food.foodQuantity}
                  </td>
                  <td className="p-4 text-center flex justify-center space-x-4">
                    <button
                      className="text-green-400 hover:text-green-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                      onClick={() => handleEditClick(food)}
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
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

      {showModal && selectedFood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 sm:w-80 transition-all duration-300 ${
              closingModal ? "animate-fadeOut" : "animate-fadeIn"
            }`}
          >
            <h3 className="text-2xl font-bold mb-4 text-green-700 dark:text-gray-200">
              Edit Food
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(selectedFood);
              }}
            >
              <div className="mb-4">
                <label className="block font-medium mb-1 text-gray-700 dark:text-green-400">
                  Food Name
                </label>
                <input
                  type="text"
                  value={selectedFood.foodName}
                  onChange={(e) =>
                    setSelectedFood({
                      ...selectedFood,
                      foodName: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded  bg-gray-100 text-gray-800 dark:bg-gray-700  dark:text-white dark:placeholder-text-gray-400"
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-1 text-gray-700 dark:text-green-400">
                  Quantity
                </label>
                <input
                  type="number"
                  value={selectedFood.foodQuantity}
                  onChange={(e) =>
                    setSelectedFood({
                      ...selectedFood,
                      foodQuantity: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded  bg-gray-100 text-gray-800 dark:bg-gray-700  dark:text-white dark:placeholder-text-gray-400"
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-1 text-gray-700 dark:text-green-400">
                  Pickup Location
                </label>
                <input
                  type="text"
                  value={selectedFood.pickupLocation}
                  onChange={(e) =>
                    setSelectedFood({
                      ...selectedFood,
                      pickupLocation: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded bg-gray-100 text-gray-800 dark:bg-gray-700  dark:text-white dark:placeholder-text-gray-400"
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

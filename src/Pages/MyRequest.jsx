import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";

import "aos/dist/aos.css";
import AOS from "aos";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const MyRequest = () => {
  const [requestedFoods, setRequestedFoods] = useState([]);
  const { user } = useAuth();
  const loggedInUserEmail = user?.email;
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (!loggedInUserEmail) return;

    axiosSecure
      .get(`/myRequest?userEmail=${loggedInUserEmail}`)
      .then((res) => {
        setRequestedFoods(res.data);
      })
      .catch((error) => {
        console.error("Error fetching requested foods:", error.message);
      });
  }, [loggedInUserEmail, axiosSecure]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-purple-100 to-purple-300 p-6">
      <h3
        className="text-4xl font-bold mb-6 text-center text-purple-700"
        data-aos="zoom-in"
      >
        My Requested Foods
      </h3>
      {requestedFoods.length === 0 ? (
        <p
          className="text-gray-700 text-center text-lg font-medium"
          data-aos="fade-up"
        >
          You have not requested any foods yet.
        </p>
      ) : (
        <div
          className="overflow-x-auto bg-white rounded-lg shadow-lg p-4"
          data-aos="fade-up"
        >
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-purple-600 to-purple-800 text-white text-left">
                <th className="p-4 text-lg font-semibold">Food Name</th>
                <th className="p-4 text-lg font-semibold">Image</th>
                <th className="p-4 text-lg font-semibold">Quantity</th>
                <th className="p-4 text-lg font-semibold">Location</th>
                <th className="p-4 text-lg font-semibold">Expires</th>
                <th className="p-4 text-lg font-semibold">Donator Email</th>
                <th className="p-4 text-lg font-semibold">Request Date</th>
                <th className="p-4 text-lg font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody className="bg-gradient-to-b from-gray-50 to-gray-100">
              {requestedFoods.map((food, index) => (
                <tr
                  key={food._id}
                  data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
                  className="hover:bg-purple-100 transition-colors border-b border-gray-300"
                >
                  <td className="p-4 border-l-4 border-purple-500">
                    {food.foodName}
                  </td>
                  <td className="p-4">
                    <img
                      src={food.foodImage || "https://via.placeholder.com/150"}
                      alt={food.foodName}
                      className="w-20 h-20 object-cover rounded-md shadow-md"
                    />
                  </td>
                  <td className="p-4">{food.foodQuantity}</td>
                  <td className="p-4">{food.pickupLocation}</td>
                  <td className="p-4">
                    {new Date(food.expireDate).toLocaleString()}
                  </td>
                  <td className="p-4">{food.foodUser?.donatorEmail}</td>
                  <td className="p-4">{food.requestedBy?.requestDate}</td>
                  <td className="p-4">
                    {food.additionalNotes || "No additional notes"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyRequest;

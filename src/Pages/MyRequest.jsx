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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 pt-10 p-6">
      {/* 🔹 Headline Fix */}
      <h3
        className="text-3xl text-green-700 md:text-4xl font-bold text-center  mb-6 mt-16"
        data-aos="zoom-in"
      >
        My Requested Foods
      </h3>

      {requestedFoods.length === 0 ? (
        <p
          className="text-gray-700 dark:text-gray-300 text-center text-lg font-medium"
          data-aos="fade-up"
        >
          You have not requested any foods yet.
        </p>
      ) : (
        <div
          className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
          data-aos="fade-up"
        >

<h3 className="text-green-500 font-semibold text-xl mb-4">
            My Added Foods: {requestedFoods.length}
          </h3>

          {/* 🔹 Responsive Table */}
          <table className="w-full  border-collapse">
            <thead>
              <tr className="bg-green-700 dark:bg-green-900 text-white">
                <th className="p-3 text-left text-lg font-semibold">Food Name</th>
                <th className="p-3 text-left text-lg font-semibold">Image</th>
                <th className="p-3 text-left text-lg font-semibold">Quantity</th>
                <th className="p-3 text-left text-lg font-semibold">Location</th>
                <th className="p-3 text-left text-lg font-semibold">Expires</th>
                <th className="p-3 text-left text-lg font-semibold">Donator Email</th>
                <th className="p-3 text-left text-lg font-semibold">Request Date</th>
                <th className="p-3 text-left text-lg font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody className="bg-gray-50 dark:bg-gray-700">
              {requestedFoods.map((food, index) => (
                <tr
                  key={food._id}
                  data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
                  className="hover:bg-gray-100 dark:hover:bg-gray-600 transition-all border-b border-gray-300 dark:border-gray-600"
                >
                  <td className="p-3 text-gray-900 dark:text-gray-200 border-l-4 border-green-500 dark:border-green-400">
                    {food.foodName}
                  </td>
                  <td className="p-3">
                    <img
                      src={food.foodImage || "https://via.placeholder.com/150"}
                      alt={food.foodName}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md shadow-md"
                    />
                  </td>
                  <td className="p-3 text-gray-900 dark:text-gray-200">{food.foodQuantity}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-200">{food.pickupLocation}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-200">
                    {new Date(food.expireDate).toLocaleString()}
                  </td>
                  <td className="p-3 text-gray-900 dark:text-gray-200">
                    {food.foodUser?.donatorEmail}
                  </td>
                  <td className="p-3 text-gray-900 dark:text-gray-200">
                    {food.requestedBy?.requestDate}
                  </td>
                  <td className="p-3 text-gray-900 dark:text-gray-200">
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

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AOS from "aos";
import "aos/dist/aos.css";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AddFood = () => {
  const { user, setErr } = useAuth();
  const [foods, setFoods] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    axios
      .get("https://al-madina-foods-server.vercel.app/foods", {
        withCredentials: true,
      })
      .then((res) => setFoods(res.data))
      .catch((error) => {
        Swal.fire("Error!", error.message, "error");
        setErr(error.message);
      });
  }, [setErr]);

  const onSubmit = (data) => {
    const foodUser = {
      donatorName: user.name,
      donatorEmail: user.email,
      donatorImage: user.photoURL,
      foodStatus: "available",
    };
    const newFood = { ...data, foodUser };

    const exists = foods.some(
      (item) =>
        item.foodName === newFood.foodName &&
        item.pickupLocation === newFood.pickupLocation &&
        item.expireDate === newFood.expireDate
    );

    if (exists) {
      Swal.fire({
        icon: "warning",
        title: "Duplicate Entry",
        text: "This food item already exists!",
      });
      return;
    }

    axios
      .post("https://al-madina-foods-server.vercel.app/add-foods", newFood, {
        withCredentials: true,
      })
      .then((res) => {
        setFoods((prev) => [...prev, res.data]);
        reset();
        toast.success("Food added successfully");
      })
      .catch((error) => {
        Swal.fire("Error!", error.message, "error");
        setErr(error.message);
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://via.placeholder.com/1500x1000')",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="container mt-20 mx-auto p-2 sm:p-4 md:p-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
        <h1
          className="text-3xl text-green-700 md:text-4xl font-bold text-center dark:text-gray-200 mb-6 mt-10"
          data-aos="fade-up"
        >
          Add Food
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Food Name */}
          <div data-aos="fade-right">
            <label
              htmlFor="foodName"
              className="block font-semibold text-sm lg:text-lg text-green-600 mb-2"
            >
              Food Name
            </label>
            <input
              type="text"
              id="foodName"
              {...register("foodName", { required: "Food Name is required" })}
              className="w-full h-12 px-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            {errors.foodName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.foodName.message}
              </p>
            )}
          </div>

          {/* Food Image */}
          <div data-aos="fade-left">
            <label
              htmlFor="foodImage"
              className="block font-semibold text-sm lg:text-lg text-green-600 mb-2"
            >
              Food Image URL
            </label>
            <input
              type="text"
              id="foodImage"
              {...register("foodImage", { required: "Food Image is required" })}
              className="w-full h-12 px-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            {errors.foodImage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.foodImage.message}
              </p>
            )}
          </div>

          {/* Food Quantity */}
          <div data-aos="fade-right">
            <label
              htmlFor="foodQuantity"
              className="block font-semibold text-sm lg:text-lg text-green-600 mb-2"
            >
              Food Quantity
            </label>
            <input
              type="number"
              id="foodQuantity"
              {...register("foodQuantity", {
                required: "Food Quantity is required",
              })}
              className="w-full h-12 px-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            {errors.foodQuantity && (
              <p className="text-red-500 text-sm mt-1">
                {errors.foodQuantity.message}
              </p>
            )}
          </div>

          {/* Pickup Location */}
          <div data-aos="fade-left">
            <label
              htmlFor="pickupLocation"
              className="block font-semibold text-sm lg:text-lg text-green-600 mb-2"
            >
              Pickup Location
            </label>
            <input
              type="text"
              id="pickupLocation"
              {...register("pickupLocation", {
                required: "Pickup Location is required",
              })}
              className="w-full h-12 px-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            {errors.pickupLocation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.pickupLocation.message}
              </p>
            )}
          </div>

          {/* Expire Date */}
          <div data-aos="fade-right">
            <label
              htmlFor="expireDate"
              className="block font-semibold text-sm lg:text-lg text-green-600 mb-2"
            >
              Expire Date
            </label>
            <input
              type="date"
              id="expireDate"
              {...register("expireDate", {
                required: "Expire Date is required",
              })}
              className="w-full h-12 px-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            {errors.expireDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.expireDate.message}
              </p>
            )}
          </div>

          {/* Additional Notes */}
          <div data-aos="fade-left">
            <label
              htmlFor="additionalNotes"
              className="block font-semibold text-sm lg:text-lg text-green-600 mb-2"
            >
              Additional Notes
            </label>
            <textarea
              id="additionalNotes"
              rows="3"
              {...register("additionalNotes")}
              className="w-full h-12 px-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 sm:col-span-2" data-aos="fade-up">
            <button
              type="submit"
              className="w-full h-12 px-6 py-3 text-white rounded-lg text-lg font-semibold shadow-md transition duration-300 transform bg-green-600 hover:bg-green-700 hover:shadow-lg "
            >
              Add Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFood;

{
  /* <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
  style={{
    backgroundImage: "url('https://via.placeholder.com/1500x1000')",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    backgroundBlendMode: "overlay",
  }}
>
  <div className="container mx-auto p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-900 bg-opacity-90 rounded-lg shadow-lg">
    <h1
      className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white"
      data-aos="fade-up"
    >
      Add Food
    </h1>
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-6">

      <div data-aos="fade-right">
        <label htmlFor="foodName" className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Food Name
        </label>
        <input
          type="text"
          id="foodName"
          {...register("foodName", { required: "Food Name is required" })}
          className="w-full h-12 px-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        {errors.foodName && <p className="text-red-500 text-sm mt-1">{errors.foodName.message}</p>}
      </div>


      <div data-aos="fade-left">
        <label htmlFor="foodImage" className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Food Image URL
        </label>
        <input
          type="text"
          id="foodImage"
          {...register("foodImage", { required: "Food Image is required" })}
          className="w-full h-12 px-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        {errors.foodImage && <p className="text-red-500 text-sm mt-1">{errors.foodImage.message}</p>}
      </div>

      <div data-aos="fade-right">
        <label htmlFor="foodQuantity" className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Food Quantity
        </label>
        <input
          type="number"
          id="foodQuantity"
          {...register("foodQuantity", { required: "Food Quantity is required" })}
          className="w-full h-12 px-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        {errors.foodQuantity && <p className="text-red-500 text-sm mt-1">{errors.foodQuantity.message}</p>}
      </div>

      <div data-aos="fade-left">
        <label htmlFor="pickupLocation" className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Pickup Location
        </label>
        <input
          type="text"
          id="pickupLocation"
          {...register("pickupLocation", { required: "Pickup Location is required" })}
          className="w-full h-12 px-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        {errors.pickupLocation && <p className="text-red-500 text-sm mt-1">{errors.pickupLocation.message}</p>}
      </div>

    
      <div data-aos="fade-right">
        <label htmlFor="expireDate" className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Expire Date
        </label>
        <input
          type="date"
          id="expireDate"
          {...register("expireDate", { required: "Expire Date is required" })}
          className="w-full h-12 px-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        {errors.expireDate && <p className="text-red-500 text-sm mt-1">{errors.expireDate.message}</p>}
      </div>

   
      <div data-aos="fade-left">
        <label htmlFor="additionalNotes" className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Additional Notes
        </label>
        <textarea
          id="additionalNotes"
          rows="3"
          {...register("additionalNotes")}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <div className="col-span-1 sm:col-span-2" data-aos="fade-up">
        <button
          type="submit"
          className="w-full h-12 px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg text-lg font-semibold shadow-md transition duration-300 transform hover:shadow-lg"
        >
          Add Food
        </button>
      </div>

    </form>
  </div>
</div> */
}

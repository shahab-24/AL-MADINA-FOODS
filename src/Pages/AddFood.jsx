import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AOS from "aos";
import "aos/dist/aos.css";
import useAuth from "../Hooks/useAuth";
import axios from "axios";

const AddFood = () => {
	const {user, setErr} = useAuth()
	// const [foods, setFoods] = useState()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const onSubmit = (data) => {
    // console.log(data);
	const foodUser = { donatorName: user.name,
		donatorEmail: user.email ,
		donatorImage: user.photoURL ,
		foodStatus: "available"

	}
	const newFood = {...data, foodUser}
	console.log("food",newFood)

	axios.post("http://localhost:3000/add-foods", newFood)
	.then(res => {
		// setFoods(res.data)
		console.log(res.data)
	})
	.catch(error => {
		setErr(error.message)
	})
    // Post data to the backend
    // axios.post('/api/foods', data)
    //   .then(response => console.log(response))
    //   .catch(error => console.error(error));
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://ibb.co.com/NpbFXDQ')",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "overlay",
      }}
    >

<div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-white" data-aos="fade-up">
        Add Food
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Food Name */}
        <div data-aos="fade-right">
          <label
            htmlFor="foodName"
            className="block text-lg font-semibold text-white mb-2"
          >
            Food Name
          </label>
          <input
            type="text"
            id="foodName"
            {...register("foodName", { required: "Food Name is required" })}
            className="w-full h-12 px-4 border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
          {errors.foodName && <p className="text-red-500 text-sm">{errors.foodName.message}</p>}
        </div>

        {/* Food Image */}
        <div data-aos="fade-left">
          <label
            htmlFor="foodImage"
            className="block text-lg font-semibold text-white mb-2"
          >
            Food Image URL
          </label>
          <input
            type="text"
            id="foodImage"
            {...register("foodImage", { required: "Food Image is required" })}
            className="w-full h-12 px-4 border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
          {errors.foodImage && <p className="text-red-500 text-sm">{errors.foodImage.message}</p>}
        </div>

        {/* Food Quantity */}
        <div data-aos="fade-right">
          <label
            htmlFor="foodQuantity"
            className="block text-lg font-semibold text-white mb-2"
          >
            Food Quantity
          </label>
          <input
            type="number"
            id="foodQuantity"
            {...register("foodQuantity", { required: "Food Quantity is required" })}
            className="w-full h-12 px-4 border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
          {errors.foodQuantity && <p className="text-red-500 text-sm">{errors.foodQuantity.message}</p>}
        </div>

        {/* Pickup Location */}
        <div data-aos="fade-left">
          <label
            htmlFor="pickupLocation"
            className="block text-lg font-semibold text-white mb-2"
          >
            Pickup Location
          </label>
          <input
            type="text"
            id="pickupLocation"
            {...register("pickupLocation", { required: "Pickup Location is required" })}
            className="w-full h-12 px-4 border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
          {errors.pickupLocation && <p className="text-red-500 text-sm">{errors.pickupLocation.message}</p>}
        </div>

        {/* Expire Date */}
        <div data-aos="fade-right">
          <label
            htmlFor="expireDate"
            className="block text-lg font-semibold text-white mb-2"
          >
            Expire Date/Time
          </label>
          <input
            type="datetime-local"
            id="expireDate"
            {...register("expireDate", { required: "Expire Date is required" })}
            className="w-full h-12 px-4 border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
          {errors.expireDate && <p className="text-red-500 text-sm">{errors.expireDate.message}</p>}
        </div>

        {/* Additional Notes */}
        <div data-aos="fade-left">
          <label
            htmlFor="additionalNotes"
            className="block text-lg font-semibold text-white mb-2"
          >
            Additional Notes
          </label>
          <textarea
            id="additionalNotes"
            rows="3"
            {...register("additionalNotes")}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2" data-aos="fade-up">
          <button
            type="submit"
            className="w-full h-12 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
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

import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import animationData from "../../assets/register-animation.json";

const Register = () => {
  const { createUser, err, handleGoogleLogin, setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 6 characters, include uppercase, lowercase, number, and a special character."
      );
      return;
    }

    try {
      const result = await createUser(email, password);
      const newUser = result.user;
      const userInfo = { name, email, photo };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user`,
        userInfo
      );
      if (response.data.insertedId) {
        toast.success("Registration successful!");
        setUser(userInfo);
        navigate("/");
      }
      form.reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4 sm:px-10">
      {/* Wrapper */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 max-w-6xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 sm:p-12">
        {/* Animation Section */}
        <div className="w-full lg:w-1/2">
          <Lottie
            animationData={animationData}
            loop
            className="w-full max-w-sm lg:max-w-md mx-auto"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
            Create Your Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Photo URL Input */}
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300">
                Photo URL
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Photo URL"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label className="block font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Your Password"
                className="input input-bordered w-full pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-10 text-gray-600 dark:text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 text-lg md:text-xl font-bold text-white bg-gradient-to-r from-green-500 to-yellow-500 hover:from-blue-500 hover:to-green-500 transition-all rounded-md shadow-md hover:shadow-lg"
            >
              Sign Up
            </button>

            {err && <p className="text-red-600 mt-2 text-center">{err}</p>}

            {/* Already have an account */}
            <p className="text-center text-gray-700 dark:text-gray-300">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>

            {/* Google Login Button */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="btn border-green-600 w-full text-sm md:text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-green-400 to-teal-400 bg-clip-text text-transparent hover:border-green-800 tracking-wider hover:text-green-600"
              >
                {/* <img
                  src="https://img.icons8.com/color/48/google-logo.png"
                  alt="Google"
                  className="w-4"
                /> */}
                Sign in with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

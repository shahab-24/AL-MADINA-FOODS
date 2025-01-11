import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import animationData from "../../assets/register-animation.json"; // Ensure the JSON file is added

const Register = () => {
  const { createUser, err, handleGoogleLogin, setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
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

    createUser(email, password)
      .then((result) => {
        const foodUser = result.user;
        // const foodUser = { name, email, photo };
        axios
          .post("https://al-madina-foods-server.vercel.app/user", foodUser)
          .then((data) => {
            if (data.data.insertedId) {
              toast.success("Registration successful");
              setUser(data.data);
              navigate("/");
            }
            form.reset();
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center py-10 px-4 sm:px-10 relative mt-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0')",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0,0,0,0.6)",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      {/* Content Wrapper */}
      <div className="relative z-20 p-4 flex flex-col lg:flex-row items-center lg:items-center justify-center gap-10 lg:gap-16 max-w-6xl w-full">
        {/* Animation Section */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <Lottie
            animationData={animationData}
            loop={true}
            className="w-full max-w-sm lg:max-w-md"
          />
        </div>

        {/* Form Section */}
        <div
          className="w-full  lg:w-1/2 shadow-xl p-8 sm:p-8 bg-white rounded-xl flex flex-col justify-center min-h-screen lg:h-[70vh] max-h-[700px]"
          style={{ backdropFilter: "blur(15px)" }}
        >
          <h2 className="font-bold text-center text-purple-700 text-3xl mt-6">
            Create Your Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Name</span>
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
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Photo URL</span>
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
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
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
            <div className="form-control relative">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Your Password"
                className="input input-bordered w-full"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-10 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full text-white font-semibold py-2 rounded-lg"
            >
              Sign Up
            </button>
            {err && <p className="text-red-600 mt-2">{err}</p>}

            {/* Already have an account */}
            <p className="mt-2 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-700 ">
                Login
              </Link>
            </p>

            {/* Google Login Button */}
            <div className="my-4 pb-8 flex flex-col items-center gap-4">
              <button
                onClick={handleGoogleLogin}
                className="btn btn-outline w-full flex items-center gap-2"
              >
                <img
                  src="https://img.icons8.com/color/48/google-logo.png"
                  alt="Google"
                  className="w-6"
                />
                Login with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;



import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const Register = () => {
	const {user,createUser, err, setErr, handleGoogleLogin,setUser} = useAuth()
	const [showPassword, setShowPassword] = useState(false)

	const handleRegister = (e) => {
		e.preventDefault()
		const form = e.target;
		const name = form.name.value;
		const email = form.email.value;
		const password = form.password.value;
		const photo = form.photo.value;
		const user = {
			email, password,
			name,
			photo
		}
		console.log(user)

		// create user============
		createUser(email, password)
		.then(res => {
			const foodUser = res.user;
			axios.post("http://localhost:3000/user",foodUser)
			.then(data => {
				console.log(data.data)
				
				if(data.data.insertedId){
					toast.success("user created successfully")
				}
				setUser(data.data)
			})
			

			
		})
		.catch(error => {
			console.log(error.message)
		})

	}


	const handleShowPassword =() => {
		setShowPassword(!showPassword)

	}

	
	return (
		<div
      className="flex justify-center items-center min-h-screen bg-cover bg-center py-10"
      style={{
        backgroundImage: "url('https://i.ibb.co.com/17DzfpB/jacek-dylag-k-H3-Sr9-K8-EBA-unsplash.jpg')",
      }}
    >
      <div
        className=" shadow-lg p-8 bg-transparent rounded-lg max-w-lg w-full z-20"
        style={{ backdropFilter: "blur(10px)" }}
      >
        <h2 className="font-bold text-center text-purple-700 text-3xl mb-4">
          Create Account
        </h2>
        <form onSubmit={handleRegister}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Photo URL</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mb-4 relative">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Your Password"
              className="input input-bordered"
              required
            />
            <button
              type="button"
              onClick={handleShowPassword}
              className="absolute right-4 top-12 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full mt-4 text-white font-semibold"
          >
            Sign Up
          </button>
          {err && <p className="text-red-600 mt-2">{err}</p>}
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-700 font-semibold">
            Login
          </Link>
        </p>
        <div className="mt-6 flex flex-col items-center gap-4">
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full flex items-center gap-2"
          >
            Login with Google
            <img
              src="https://img.icons8.com/color/48/google-logo.png"
              alt="Google"
              className="w-6"
            />
          </button>
        </div>
      </div>
    </div>
	);
};

export default Register;
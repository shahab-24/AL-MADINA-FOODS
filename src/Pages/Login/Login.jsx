import Lottie from "lottie-react";
import lottieLoginData from "../../assets/login.json";
import useAuth from '../../Hooks/useAuth'

import { toast } from "react-toastify";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
const { loginUser,setErr, setUser , err, handleGoogleLogin} = useAuth();
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const location  = useLocation()
   const from = location.state?.from?.pathname || "/" ;

  const handleShowPassword =() => {
    setShowPassword(!showPassword)
  }

  const handleLogin = (e) => {
    e.preventDefault();

	const form = e.target;
	const email = form.email.value;
	const password = form.password.value;



setErr("")
	loginUser(email, password)
	.then(result => {
    const user = result.user;
    
    if(user){
      toast.success("login successfull")
      setUser(user)
      navigate(from, {replace: true})
    

    }

      
  

 
		})
	

	
	.catch(error => {
		setErr(error.message)
    toast.error(error.message)
	})
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <Lottie
            animationData={lottieLoginData}
            className="w-[70%] mx-auto"
          ></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl lg:ml-32">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <button type='button' onClick={handleShowPassword} className="absolute right-12 top-44 text-gray-600">
              {showPassword ? <FaEyeSlash /> : <FaEye />}

              </button>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <div className="divider"></div>
        <p className="text-center">Or</p>
          <div className="mt-6 flex flex-col items-center gap-4 mb-10 px-8">
          <button
            onClick={()=>handleGoogleLogin(navigate, location)}
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
          {
      err && (<p className='text-red-500'>{err}</p>)
    }
        </div>
        
      </div>
    </div>
  );
};

export default Login;

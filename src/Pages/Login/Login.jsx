import Lottie from "lottie-react";
import lottieLoginData from "../../assets/login.json";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { loginUser, setErr, setUser, err, handleGoogleLogin, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    // Redirect if user is already logged in
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setErr("");
    loginUser(email, password)
      .then((result) => {
        const loggedInUser = result.user;
        if (loggedInUser) {
          toast.success("Login successful");
          setUser(loggedInUser);
          navigate("/", { replace: true }); // Redirects to Home
        }
      })
      .catch((error) => {
        setErr(error.message);
        toast.error(error.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen flex justify-center items-center">
      <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-5xl px-4">
        <div className="text-center lg:text-left w-full lg:w-1/2 mt-16 pt-10">
          <h1 className="text-2xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-green-400 to-teal-400 bg-clip-text text-transparent tracking-wider">
            Login now!
          </h1>
          <Lottie animationData={lottieLoginData} className="w-[80%] mx-auto" />
        </div>

        <div className="card bg-base-100 w-full max-w-md shadow-2xl p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name="email" placeholder="Enter email" className="input input-bordered w-full" required />
            </div>

            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter password" className="input input-bordered w-full" required />
              <button type="button" onClick={handleShowPassword} className="absolute right-4 top-12 text-gray-600">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button className="w-full py-3 text-lg md:text-xl font-bold text-white bg-gradient-to-r from-green-500 to-yellow-500 hover:from-blue-500 hover:to-green-500 transition-all rounded-md shadow-md hover:shadow-lg">
              Login
            </button>
          </form>

          <div className="divider text-green-600">OR</div>
          <button onClick={() => handleGoogleLogin(navigate, location)} className="btn border-green-600 w-full text-sm md:text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-green-400 to-teal-400 bg-clip-text text-transparent hover:border-green-800 tracking-wider hover:text-green-600">
            Login with Google
          </button>

          {err && <p className="text-red-500 text-center mt-2">{err}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;

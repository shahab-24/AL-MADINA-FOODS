
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      {/* Error Image */}
      <img
        src="https://i.ibb.co.com/YTRy0Pj/error.jpg" // Replace this URL with your error image
        alt="Error"
        className="w-full max-w-md mb-6"
      />

      {/* Error Message */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        It seems the page you are looking for doesn’t exist. Let’s get you back on track!
      </p>

      {/* Go Home Button */}
      <button
        onClick={handleGoHome}
        className="btn btn-primary text-lg font-semibold px-8 py-2 rounded-lg shadow-lg hover:bg-blue-700"
      >
        Return to Home
      </button>
    </div>
  );
};

export default ErrorPage;

import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading skeleton during authentication check
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-4 space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-12 bg-gray-300 rounded-md animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // If user is authenticated, render children
  if (user) {
    return children;
  }

  // Show alert if user is not authenticated
  Swal.fire({
    icon: "warning",
    title: "Unauthorized Access",
    text: "You must log in to access this page.",
    confirmButtonText: "Go to Login",
  });

  // Redirect to login page
  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const PrivateRoute = ({children}) => {
	const {user,loading} = useAuth();
	const location = useLocation()

	if(loading){
		return <span className="loading loading-dots loading-lg"></span>

	}
	if(user){
		return children
	}
	return <Navigate to='/login' state={location.pathname}></Navigate>
};

export default PrivateRoute;
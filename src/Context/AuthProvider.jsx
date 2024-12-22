import { useState } from "react";
import AuthContext from "./AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase.config";



const AuthProvider = ({children}) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)
	const [err, setErr] = useState("")

	const createUser =(email, password)=> {
		createUserWithEmailAndPassword(auth,email, password)
		.then((result) => {
			const user = result.user
			console.log(user)
		})
		.catch(error => {
			console.log(error.message)
		})


	}
	

	const authInfo = {user,
		loading,
	}
	return (
		<AuthContext.Provider value={authInfo}>
		{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
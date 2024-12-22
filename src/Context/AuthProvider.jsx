import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase.config";



const AuthProvider = ({children}) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)
	const [err, setErr] = useState("")

	const createUser =(email, password)=> {
		setLoading(true)
		 return createUserWithEmailAndPassword(auth,email, password)
		
	}

	const loginUser =(email, password) => {
		setLoading(true)
		return signInWithEmailAndPassword(auth, email, password)

	}


	useEffect(() => {
		const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
			if(currentUser){
				console.log("current user from authState",currentUser)
				setUser(currentUser)
			}
		})
		return () => {
			unSubscribe();
		}
	},[])
	

	const authInfo = {user,
		createUser,
		loginUser,
		loading,
	}
	return (
		<AuthContext.Provider value={authInfo}>
		{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
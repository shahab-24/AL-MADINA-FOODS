import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../Firebase.config";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const navigate = useNavigate()
  

  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        setLoading(false);
        console.log(user);
        toast.success("Login successful");
        navigate('/')
	
      })
      .catch((error) => {
        console.log(error.message);
        setErr(error.message);
        setLoading(false);
        toast.error(error.message);
      });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.email) {
        console.log("current user from authState", currentUser);
        const user = { email: currentUser.email };
        axios
          .post("https://al-madina-foods-server.vercel.app/jwt", user, {
            withCredentials: true,
          })
          .then((result) => console.log("login token", result.data))
          .catch((error) => {
            console.log(error.message);
          });

        setUser(currentUser)
        setLoading(false);
        navigate('/')
      } else {
        axios
          .post(
            "https://al-madina-foods-server.vercel.app/logout",
            {},
            {
              withCredentials: true,
            }
          )
          .then((result) => { setUser(null)
            console.log("logout", result.data)});
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const logOutUser = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate('/')
      })
      .catch((error) => {
        setErr(error.message);
      });
  };

  const authInfo = {
    user,
    setUser,
    createUser,
    loginUser,
    logOutUser,
    loading,
    err,
    setErr,
    handleGoogleLogin,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

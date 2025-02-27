import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://al-madina-foods-server.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  return axiosInstance;
};

export default useAxiosSecure;

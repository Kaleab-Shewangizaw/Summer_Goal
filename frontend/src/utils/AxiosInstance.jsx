import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3040/api",
  withCredentials: true,
});

export default axiosInstance;

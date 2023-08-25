import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const configCommon = {
  baseURL: process.env.HOST_MONITOR.toString(),
  withCredentials: true
};

const axiosInstance = axios.create(configCommon);

export default axiosInstance;

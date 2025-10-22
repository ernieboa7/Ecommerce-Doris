import axios from "axios";

//const API_BASE_URL =
//  process.env.REACT_APP_API_BASE_URL || "https://ecommerce-doris.onrender.com/api";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://ecommerce-doris.onrender.com/api";


const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosInstance;

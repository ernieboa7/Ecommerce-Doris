import Axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5001/api";

export const axiosInstance = Axios.create({
  baseURL: API_BASE_URL,
});

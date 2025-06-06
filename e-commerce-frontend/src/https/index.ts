import axios from 'axios'

//povezivanje za ostalo
export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:4000/" : "/",
  withCredentials: true,
});


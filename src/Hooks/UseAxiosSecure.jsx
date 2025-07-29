import axios from "axios";
import { useEffect } from "react";

const UseAxiosSecure = () => {
  const instance = axios.create({
    baseURL: "http://localhost:3000", 
  });

  useEffect(() => {
    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, [instance]);

  return instance;
};

export default UseAxiosSecure;

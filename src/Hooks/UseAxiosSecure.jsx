import axios from "axios";

const UseAxiosSecure = () => {
  const instance = axios.create({
    baseURL: "http://localhost:5000",
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

export default UseAxiosSecure;

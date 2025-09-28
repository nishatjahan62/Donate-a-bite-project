import axios from "axios";
import React from "react";
const axiosIntense = axios.create({
  baseURL: "https://assignment-12-server-one-eosin.vercel.app/",
});

const useAxios = () => {
  return axiosIntense;
};

export default useAxios;

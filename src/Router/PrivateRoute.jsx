import React from "react";
import { Navigate, useLocation } from "react-router";
import Loading from "../Pages/Loading/Loading";
import UseAuth from "../Hooks/UseAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();
  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return <Navigate to={"/auth/Login"} state={location.pathname}></Navigate>;
  }
  return children;
};

export default PrivateRoute;

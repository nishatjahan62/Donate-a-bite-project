import React, { use } from "react";
import AuthContext from "../Provider/AuthContext";

const UseAuth = () => {
  const authHook = use(AuthContext);
  return authHook;
};

export default UseAuth;

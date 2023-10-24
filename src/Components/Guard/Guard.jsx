import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Guard({ children }) {
  if (localStorage.getItem("userToken") != null) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}

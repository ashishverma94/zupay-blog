import React from "react";
import { Navigate } from "react-router-dom";
import useUserStore from "../store/userStore";

const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
  const { isLoggedIn } = useUserStore();

  return isLoggedIn ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

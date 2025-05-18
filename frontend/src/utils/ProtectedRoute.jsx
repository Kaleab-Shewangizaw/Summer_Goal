import { Navigate } from "react-router-dom";
import { UserContext } from "./AuthContext";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  return user ? children : <Navigate to="/start" />;
};

export default ProtectedRoute;

import { useContext } from "react";
import { userContext } from "../../Context/UserContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(userContext);
  if (!token) {
    //m4 login
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

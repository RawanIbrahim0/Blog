import { Navigate } from "react-router";

export default function PrivateRoute({ children }) {
  const userId = localStorage.getItem("userId");

  return userId ? children : <Navigate to="/login" />;
}

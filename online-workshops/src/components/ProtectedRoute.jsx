import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/auth";

export default function ProtectedRoute({ role, children }) {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role && !(role === "user" && user.role === "admin")) {
    // Admin can access user routes too
    return <Navigate to="/" replace />;
  }
  return children;
}

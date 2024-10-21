import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
      const { isAuthenticated } = useAuth();
      return !isAuthenticated() ? <Navigate to="/login" /> : <Outlet />;
}
import { useUserContext } from "../hooks/UseUserContext";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { isLoggedIn, loading } = useUserContext();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="w-8 h-8 border-3 border-[#b91c1c] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/auth/admin-login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

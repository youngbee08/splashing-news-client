import { useUserContext } from "../hooks/UseUserContext";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUserContext();

  if (!isLoggedIn) {
    navigate("/auth/admin-login");
    return;
  }

  return isLoggedIn && <Outlet />;
};

export default ProtectedRoute;

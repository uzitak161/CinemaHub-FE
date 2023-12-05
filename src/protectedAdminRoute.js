import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
  const { currentUser } = useSelector((state) => state.user);
  if (currentUser && currentUser.role === "ADMIN") {
    return children;
  }
  return <Navigate to="/Login" />;
}

export default ProtectedAdminRoute;

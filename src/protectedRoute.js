import { Navigate } from "react-router";
import { useSelector } from "react-redux";

function ProtectedRoute({ default_route, children }) {
  const { currentUser } = useSelector((state) => state.user);
  if (currentUser) {
    return children;
  }
  return <Navigate to={default_route} />;
}

export default ProtectedRoute;

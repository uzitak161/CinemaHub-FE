import { Link, Route, Routes } from "react-router-dom";
import ProtectedAdminRoute from "../protectedAdminRoute";
import AdminReviews from "./AdminReviews";
import AdminUsers from "./AdminUsers";

function Admin() {
  return (
    <div>
      <div className={"text-center pt-3"}>
        <Link to={"/admin/reviews"} className={"m-2 btn btn-secondary"}>
          Edit Reviews
        </Link>
        <Link to={"/admin/users"} className={"m-2 btn btn-secondary"}>
          Edit User Base
        </Link>
      </div>
      <Routes>
        <Route
          path={"Reviews"}
          element={
            <ProtectedAdminRoute>
              <AdminReviews />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path={"Users"}
          element={
            <ProtectedAdminRoute>
              <AdminUsers />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default Admin;

import { useContext } from "react";
import { Store } from "../../Store";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const {
    state: { userInfo },
  } = useContext(Store);
  console.log('userInfo :', userInfo)
  if (userInfo) {
    return <Outlet />;
  } else {
    return <Navigate to="/signin" />;
  }
}

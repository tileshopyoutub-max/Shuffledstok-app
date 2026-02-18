import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ADMIN_ROLE = "admin";
const ROLES_CLAIM = "https://shuffledstock-app.com/roles";

export const AdminRoute = () => {
  // const { isAuthenticated, isLoading, user, loginWithRedirect } = useAuth0()

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  // if (!isAuthenticated) {
  //   loginWithRedirect()
  //   return null
  // }

  // const roles: string[] = user?.[ROLES_CLAIM] || []

  // if (!roles.includes(ADMIN_ROLE)) {
  //   return <Navigate to="/" replace />
  // }

  return <Outlet />;
};

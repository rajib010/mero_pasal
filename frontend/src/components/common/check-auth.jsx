import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // Redirect to login if not authenticated and trying to access protected routes
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/auth/login") ||
      location.pathname.includes("/auth/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // Redirect authenticated users away from login/register pages
  if (
    isAuthenticated &&
    (location.pathname.includes("/auth/login") ||
      location.pathname.includes("/auth/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else if (user?.role === "user") {
      return <Navigate to="/shop/home" />;
    }
  }

  // Redirect users based on roles when accessing restricted routes
  if (isAuthenticated) {
    if (user?.role === "user" && location.pathname.includes("/admin")) {
      return <Navigate to="/shop/home" />;
    }

    if (user?.role === "admin" && location.pathname.includes("/shop")) {
      return <Navigate to="/admin/dashboard" />;
    }
  }

  // Default redirection from the root route
  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else if (user?.role === "user") {
        return <Navigate to="/shop/home" />;
      }
    }
  }

  // Render children for all other cases
  return <>{children}</>;
}

export default CheckAuth;

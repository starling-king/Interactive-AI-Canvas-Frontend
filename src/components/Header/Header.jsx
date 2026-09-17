import { useLocation } from "react-router-dom";
import PublicHeader from "./PublicHeader";
import AdminHeader from "./AdminHeader";
import { useAuthStore } from "../../store/authStore.js";

export default function Header() {
  const authStatus = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return authStatus && isAdminRoute ? <AdminHeader /> : <PublicHeader />;
}

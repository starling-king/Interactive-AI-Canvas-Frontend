import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PublicHeader from "./PublicHeader";
import AdminHeader from "./AdminHeader";

export default function Header() {
  const authStatus = useSelector((state) => state.AuthReducer?.status || false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return authStatus && isAdminRoute ? <AdminHeader /> : <PublicHeader />;
}

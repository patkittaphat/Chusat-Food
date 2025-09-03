import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Add from "../../pages/Admin/Add";
import List from "../../pages/Admin/List";
import Orders from "../../pages/Admin/Orders";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname.replace(/\/+$/, "");
  let currentPage = "add";
  if (currentPath.endsWith("/list")) currentPage = "list";
  else if (currentPath.endsWith("/orders")) currentPage = "orders";
  else currentPage = "add";

  const setPage = (page) => {
    const target =
      page === "add"
        ? "/controller/add"
        : page === "list"
        ? "/controller/list"
        : "/controller/orders";
    navigate(target);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar currentPage={currentPage} setPage={setPage} />
      <div className="flex-1 p-6">
        <Routes>
          <Route index element={<Navigate to="add" replace />} />
          <Route path="add" element={<Add />} />
          <Route path="list" element={<List />} />
          <Route path="orders" element={<Orders />} />
          <Route path="*" element={<Navigate to="add" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;

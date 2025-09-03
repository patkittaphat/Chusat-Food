import React, { useState } from "react";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import MyOrders from "./pages/MyOrders/MyOrders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppDownload from "./components/AppDownload/AppDownload";
import Verify from "./pages/Verify/Verify";
import BookingConfirm from "./components/BookingConfirm/BookingConfirm";
import AdminLayout from "./components/admin/AdminLayout";
import Ingredient from "./pages/Ingredient/Ingredient";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/controller");

  return (
    <>
      <ToastContainer />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className={isAdmin ? "" : "app"}>
        {!isAdmin && <Navbar setShowLogin={setShowLogin} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/ingredient" element={<Ingredient />} />
          <Route path="/booking" element={<AppDownload />} />
          <Route path="/booking-confirm" element={<BookingConfirm />} />
          {/* Admin side routes with separate layout */}
          <Route path="/controller/*" element={<AdminLayout />} />
        </Routes>
      </div>
      {!isAdmin && <Footer />}
    </>
  );
};

export default App;

import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/authPages";
import VerifyOtpPage from "@/pages/VerifyOtpPage";
import LoginPage from "./pages/Login";
import ForgotPasswordPage from "./pages/Forgepassword";
import ResetPasswordPage from "./pages/resetPasswordpage";
import { SellerLayout } from "./Layout/SellerLayout";
import { ProtectedRoute } from "./routes/ProtectedRoutes";
import SellerProductsPage from "./pages/SellerProductsPage";
import SellerOrdersPage from "./pages/SellerOrdersPage";
import SellerAnalyticsPage from "./pages/SellerAnalyticsPage";
import { Navigate } from "react-router-dom";
import { BuyerLayout } from "./Layout/BuyerLayout";
import BuyerHomePage from "./pages/BuyerHomePage";
import CartPage from "./pages/CartPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import AccountPage from "./pages/AccountPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      <Route
        path="/seller"
        element={
          <ProtectedRoute allowedRole="seller">
            <SellerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/seller/products" replace />} />
        <Route path="dashboard" element={<Navigate to="/seller/products" replace />} />
        <Route path="products" element={<SellerProductsPage />} />
        <Route path="orders" element={<SellerOrdersPage />} />
        <Route path="analytics" element={<SellerAnalyticsPage />} />
      </Route>
      <Route
        path="/buyer"
        element={
          <ProtectedRoute allowedRole="buyer">
            <BuyerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/buyer/home" replace />} />
        <Route path="home" element={<BuyerHomePage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="track-order" element={<OrderTrackingPage />} />
        <Route path="account" element={<AccountPage />} />
      </Route>
    </Routes>
  );
}
export default App;
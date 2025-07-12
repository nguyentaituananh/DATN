import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";

// Layouts
import LayoutAdmin from "./layouts/admin/LayoutAdmin";
import Layout from "./components/layout/Layout";

// Context Providers
import { CartProvider } from "./context/CartContext";
import HomePage from "./pages/user/HomePage";
import Layout from "./components/layout/Layout";
import { AuthProvider } from "./pages/context/AuthContext";
import CheckoutPage from "./pages/user/CheckoutPage";
import RegisterPage from "./pages/user/RegisterPage";
import LoginPage from "./pages/user/LoginPage";
import { ConfigProvider } from "antd";
import ProductsPage from "./pages/user/ProductsPage";
import ProductDetailPage from "./pages/user/ProductDetailPage";

import ProductList from "./pages/admin/products/ProductList";
import CreateProducts from "./pages/admin/products/CreateProducts";
import OrderList from "./pages/admin/order/OrderList";
import UserList from "./pages/admin/account/UserList";
import CommentList from "./pages/admin/reviews/reviewsList";
import AccountInfo from "./pages/admin/account/AccountInfo";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin";

// User Pages
import HomePage from "./pages/user/HomePage";
import ProductsPage from "./pages/user/ProductsPage";
import ProductDetailPage from "./pages/user/ProductDetailPage";
import CartPage from "./pages/user/CartPage";
import CheckoutPage from "./pages/user/CheckoutPage";
import AboutPage from "./pages/user/AboutPage";
import AccountInfoPage from "./pages/user/DeitailUser";
import ChangePasswordPage from "./pages/user/ChangePasswordPage";

// Ant Design Theme
const theme = {
  token: {
    colorPrimary: "#B45309",
    colorLink: "#B45309",
    fontFamily: "'Poppins', sans-serif",
  },
};

// React Query Client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={theme}>
        <StrictMode>
          <BrowserRouter>
            <AuthProvider>
              <OrderProvider>
                <CartProvider>
                  <ReviewProvider>
                    <Routes>
                      {/* ADMIN ROUTES */}
                      <Route
                        path="/admin"
                        element={
                          <ProtectedRouteAdmin>
                            <LayoutAdmin />
                          </ProtectedRouteAdmin>
                        }
                      >
                        <Route index element={<DashboardPage />} />
                        <Route path="dashboard" element={<DashboardPage />} />
                        <Route path="product" element={<ProductList />} />
                        <Route
                          path="product/add"
                          element={<CreateProducts />}
                        />
                        <Route
                          path="product/edit/:id"
                          element={<CreateProducts />}
                        />
                        <Route path="order" element={<OrderList />} />
                        <Route path="user" element={<UserList />} />
                        <Route path="comment" element={<CommentList />} />
                        <Route path="import" element={<OrderList />} />
                        <Route path="account" element={<AccountInfo />} />
                      </Route>

            {/* USER ROUTES */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/:category" element={<ProductsPage />} />
              <Route path="product/:id" element={<ProductDetailPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="userDeitail/:id" element={<AccountInfoPage />} />
              <Route path="change-password" element={<ChangePasswordPage />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;

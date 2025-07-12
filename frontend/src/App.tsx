import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";

// Layouts
import LayoutAdmin from "./layouts/admin/LayoutAdmin";
import Layout from "./components/layout/layout";

// Context Providers
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./pages/context/AuthContext";
import { OrderProvider } from "./context/OrderContext";
import { ReviewProvider } from "./context/reviewsContext";

// Admin Pages
import { DashboardPage } from "./pages/admin/DashboardPage";
import ProductList from "./pages/admin/products/ProductList";
import CreateProducts from "./pages/admin/products/CreateProducts";
import OrderList from "./pages/admin/order/OrderList";
import UserList from "./pages/admin/account/UserList";
import CommentList from "./pages/admin/reviews/reviewsList";
import AccountInfo from "./pages/admin/account/AccountInfo";

// User Pages
import HomePage from "./pages/user/HomePage";
import ProductsPage from "./pages/user/ProductsPage";
import ProductDetailPage from "./pages/user/ProductDetailPage";
import CartPage from "./pages/user/CartPage";
import CheckoutPage from "./pages/user/CheckoutPage";
import AboutPage from "./pages/user/AboutPage";
import LoginPage from "./pages/user/LoginPage";
import RegisterPage from "./pages/admin/user/RegisterPage";

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
                      <Route path="/admin" element={<LayoutAdmin />}>
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
                        <Route
                          path="products/:category"
                          element={<ProductsPage />}
                        />
                        <Route
                          path="product/:id"
                          element={<ProductDetailPage />}
                        />
                        <Route path="cart" element={<CartPage />} />
                        <Route path="checkout" element={<CheckoutPage />} />
                        <Route path="about" element={<AboutPage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                      </Route>
                    </Routes>
                  </ReviewProvider>
                </CartProvider>
              </OrderProvider>
            </AuthProvider>
          </BrowserRouter>
        </StrictMode>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;

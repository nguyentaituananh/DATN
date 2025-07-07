import { Route, Routes } from "react-router";
import LayoutAdmin from "./layouts/admin/LayoutAdmin";
import CartPage from "./pages/user/CartPage";
import { CartProvider } from "./context/CartContext";
import HomePage from "./pages/user/HomePage";
import Layout from "./components/layout/layout";
import { AuthProvider } from "./context/AuthContext";
import CheckoutPage from "./pages/user/CheckoutPage";
import RegisterPage from "./pages/admin/user/RegisterPage";
import LoginPage from "./pages/user/LoginPage";
import { ConfigProvider } from "antd";
import ProductsPage from "./pages/user/ProductsPage";
import ProductDetailPage from "./pages/user/ProductDetailPage";

import ProductList from "./pages/admin/products/ProductList";
import { DashboardPage } from "./pages/admin/DashboardPage";
import CreateProducts from "./pages/admin/products/CreateProducts";
import OrderList from "./pages/admin/order/OrderList";
import UserList from "./pages/admin/account/UserList";
import CommentList from "./pages/admin/comment/CommentList";
import AccountInfo from "./pages/admin/account/AccountInfo";
import AboutPage from "./pages/user/AboutPage";
import AccountInfoPage from "./pages/user/DeitailUser";

const theme = {
  token: {
    colorPrimary: "#B45309",
    colorLink: "#B45309",
    fontFamily: "'Poppins', sans-serif",
  },
};

function App() {
  return (
    <ConfigProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/admin" element={<LayoutAdmin />}>
              <Route index element={<DashboardPage />} />{" "}
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="product" element={<ProductList />} />
              <Route path="product/add" element={<CreateProducts />} />
              <Route path="product/edit/:id" element={<CreateProducts />} />
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
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;

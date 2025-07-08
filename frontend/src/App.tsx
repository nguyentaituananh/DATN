import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layouts/admin/LayoutAdmin";
import CartPage from "./pages/user/CartPage";
import { CartProvider } from "./context/CartContext";
import HomePage from "./pages/user/HomePage";
import Layout from "./components/layout/layout";
import CheckoutPage from "./pages/user/CheckoutPage";
import RegisterPage from "./pages/user/RegisterPage";
import LoginPage from "./pages/user/LoginPage";
import { ConfigProvider } from "antd";
import ProductsPage from "./pages/user/ProductsPage";
import ProductDetailPage from "./pages/user/ProductDetailPage";

import ProductList from "./pages/admin/products/ProductList";
import { DashboardPage } from "./pages/admin/DashboardPage";
import CreateProducts from "./pages/admin/products/CreateProducts";
import OrderList from "./pages/admin/order/OrderList";
import UserList from "./pages/admin/account/UserList";
import CommentList from "./pages/admin/reviews/reviewsList";
import AccountInfo from "./pages/admin/account/AccountInfo";
import AboutPage from "./pages/user/AboutPage";
import { AuthProvider } from "./pages/context/AuthContext";
import { ReviewProvider } from "./context/reviewsContext"; // ✅ Thêm dòng này
import OrderForm from "./pages/admin/order/CreateOder";
import EditOrder from "./pages/admin/order/EditOrder";
import OrderDetail from "./pages/admin/order/OrderDetail";
import CategoryList from "./pages/admin/category/CategoryList";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import EditCategory from "./pages/admin/category/CategoryEdit";

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
          <ReviewProvider>
            {" "}
            {/* ✅ Bọc thêm CommentProvider */}
            <Routes>
              {/* ADMIN ROUTES */}
              <Route path="/admin" element={<LayoutAdmin />}>
                <Route index element={<DashboardPage />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="product" element={<ProductList />} />
                <Route path="product/add" element={<CreateProducts />} />
                <Route path="product/edit/:id" element={<CreateProducts />} />
                <Route path="order" element={<OrderList />} />
                <Route path="order/create" element={<OrderForm />} />
                <Route path="order/edit/:id" element={<EditOrder />} />
                <Route path="order/:id" element={<OrderDetail />} />
                <Route path="category" element={<CategoryList />} />
                <Route path="category/create" element={<CategoryCreate />} />
                <Route path="category/edit/:id" element={<EditCategory />} />
                <Route path="user" element={<UserList />} />
                <Route path="comment" element={<CommentList />} />
                <Route path="import" element={<OrderList />} />
                <Route path="account" element={<AccountInfo />} />
              </Route>

              {/* USER ROUTES */}
              <Route path="/" element={<Layout></Layout>}>
                <Route index element={<HomePage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="products/:category" element={<ProductsPage />} />
                <Route path="product/:id" element={<ProductDetailPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="about" element={<AboutPage />} />
              </Route>
            </Routes>
          </ReviewProvider>{" "}
          {/* ✅ Đóng CommentProvider */}
        </CartProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
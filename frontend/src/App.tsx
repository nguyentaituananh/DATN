import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";

// Layouts
import LayoutAdmin from "./layouts/admin/LayoutAdmin";
import Layout from "./components/layout/Layout";

// Context Providers
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./pages/context/AuthContext";
import { OrderProvider } from "./context/OrderContext";
import { ReviewProvider } from "./context/reviewsContext";

// Admin Pages
import { DashboardPage } from "./pages/admin/DashboardPage";
import ProductList from "./pages/admin/products/ProductList";
import ProductVariantList from "./pages/admin/product-variant/productVariantList";
import CreateProducts from "./pages/admin/products/CreateProducts";
import EditProducts from "./pages/admin/products/EditProduct";
import AddProductVariant from "./pages/admin/product-variant/productVariantCreate";
import OrderList from "./pages/admin/order/OrderList";
import OrderForm from "./pages/admin/order/CreateOder";
import EditOrder from "./pages/admin/order/EditOrder";
import OrderDetail from "./pages/admin/order/OrderDetail";
import UserList from "./pages/admin/account/UserList";
import CommentList from "./pages/admin/reviews/reviewsList";
import AccountInfo from "./pages/admin/account/AccountInfo";
import CategoryList from "./pages/admin/category/CategoryList";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import EditCategory from "./pages/admin/category/CategoryEdit";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin";
import EditProductVariant from "./pages/admin/product-variant/productVariantEdit";

// User Pages
import HomePage from "./pages/user/HomePage";
import ProductsPage from "./pages/user/ProductsPage";
import ProductDetailPage from "./pages/user/ProductDetailPage";
import CartPage from "./pages/user/CartPage";
import CheckoutPage from "./pages/user/CheckoutPage";
import AboutPage from "./pages/user/AboutPage";
import LoginPage from "./pages/user/LoginPage";
import RegisterPage from "./pages/user/RegisterPage";
import AccountInfoPage from "./pages/user/DeitailUser";

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
                        <Route path="product/add" element={<CreateProducts />} />
                        <Route path="product/edit/:id" element={<EditProducts />} />
                        <Route path="product-variant" element={<ProductVariantList />} />
                        <Route path="product-variant/create" element={<AddProductVariant />} />
                        <Route path="product-variant/edit/:id" element={<EditProductVariant />} />
                        <Route path="order" element={<OrderList />} />
                        <Route path="order/create" element={<OrderForm />} />
                        <Route path="order/edit/:id" element={<EditOrder />} />
                        <Route path="order/:id" element={<OrderDetail />} />
                        <Route path="user" element={<UserList />} />
                        <Route path="comment" element={<CommentList />} />
                        <Route path="category" element={<CategoryList />} />
                        <Route path="category/create" element={<CategoryCreate />} />
                        <Route path="category/edit/:id" element={<EditCategory />} />
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
                  </ReviewProvider>
                </CartProvider>
              </OrderProvider>
            </AuthProvider>
        </StrictMode>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
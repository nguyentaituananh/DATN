import { Route, Routes } from "react-router";
import LayoutAdmin from "./layouts/admin/LayoutAdmin"
import CartPage from "./pages/user/CartPage";
import { CartProvider } from "./context/CartContext";
import HomePage from "./pages/user/HomePage";
import Layout from "./components/layout/layout";
import { AuthProvider } from "./context/AuthContext";
import CheckoutPage from "./pages/user/CheckoutPage";
import RegisterPage from "./pages/user/RegisterPage";
import LoginPage from "./pages/user/LoginPage";
import { ConfigProvider } from "antd";
import ProductsPage from "./pages/user/ProductsPage";
import ProductDetailPage from "./pages/user/ProductDetailPage";
import AboutPage from "./pages/user/AboutPage";

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
            <Route path="/admin" element={<LayoutAdmin />} />
            <Route
              path="*"
              element={
                <Layout>
                  <Routes>
                    
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/:category" element={<ProductsPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/about" element={<AboutPage />} />
                  </Routes>
                </Layout>
              }
            />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;

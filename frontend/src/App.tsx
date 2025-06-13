import { Route, Routes } from "react-router";
import LayoutAdmin from "./layouts/LayoutAdmin/LayoutAdmin";
import { Dashboard } from "./layouts/LayoutAdmin/Dashboard";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import HomePage from "./pages/HomePage";
import Layout from "./components/layout/layout";
import { AuthProvider } from "./context/AuthContext";
import CheckoutPage from "./pages/CheckoutPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { ConfigProvider } from "antd";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
// import { User } from "./layouts/LayoutAdmin/User";


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
            <Route path="/dashboard" element={<Dashboard />} />
           
            <Route path="/layoutAdmin" element={<LayoutAdmin />} />
             
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

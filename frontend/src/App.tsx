import { Route, Routes } from "react-router";
import LayoutAdmin from "./layouts/LayoutAdmin";
import Dashboard from "./layouts/Dashboard";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import HomePage from "./pages/HomePage";
import Layout from "./components/layout/layout";
import { AuthProvider } from "./context/AuthContext";
import CheckoutPage from "./pages/CheckoutPage";
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { ConfigProvider } from "antd";

const theme = {
  token: {
    colorPrimary: '#B45309',
    colorLink: '#B45309',
    fontFamily: "'Poppins', sans-serif",
  },
};

function App() {
  return (
    <ConfigProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/admin" element={<LayoutAdmin />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<HomePage />}/>
        <Route path="/cart" element={<CartPage />}/>
        <Route path="/checkout" element={<CheckoutPage />}/>
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/layoutAdmin" element={<LayoutAdmin />} />
            </Routes>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;

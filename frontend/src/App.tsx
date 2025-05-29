import { Route, Routes } from "react-router";
import LayoutAdmin from "./layouts/LayoutAdmin";
import Dashboard from "./layouts/Dashboard";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import HomePage from "./pages/HomePage";
import Layout from "./components/layout/layout";
import { AuthProvider } from "./context/AuthContext";
import CheckoutPage from "./pages/CheckoutPage";


function App() {
  return (
    <>
    <AuthProvider>
    <CartProvider>
      <Layout>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/cart" element={<CartPage />}/>
        <Route path="/checkout" element={<CheckoutPage />}/>
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/layoutAdmin" element={<LayoutAdmin />} />
      </Routes>
      </Layout>
      </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;

import { Route, Routes } from "react-router";
import LayoutAdmin from "./layouts/LayoutAdmin";
import Dashboard from "./layouts/Dashboard";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import HomePage from "./pages/HomePage";


function App() {
  return (
    <>
    <CartProvider>
      <Routes>
        <Route path="/" element={<HomePage />}>
        <Route path="/cart" element={<CartPage />}/>
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/layoutAdmin" element={<LayoutAdmin />} />
        </Route>
      </Routes>
      </CartProvider>
    </>
  );
}

export default App;

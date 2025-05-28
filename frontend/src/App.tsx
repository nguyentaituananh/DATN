import { Route, Routes } from "react-router";
import LayoutAdmin from "./layouts/LayoutAdmin";
import Dashboard from "./pages/Dashboard";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import HomePage from "./pages/HomePage";


function App() {
  return (
    <>
    <CartProvider>
      <Routes>
        <Route path="/" element={<LayoutAdmin />}>
        <Route path="/cart" element={<CartPage />}/>
        <Route path="/home" element={<HomePage />}/>
        </Route>
      </Routes>
      </CartProvider>
    </>
  );
}

export default App;

import { Route, Routes } from "react-router";
import LayoutAdmin from "./layouts/LayoutAdmin";
import Dashboard from "./pages/Dashboard";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";


function App() {
  return (
    <>
    <CartProvider>
      <Routes>
        <Route path="/" element={<LayoutAdmin />}>
        <Route path="/cart" element={<CartPage />}/>
        
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
      </CartProvider>
    </>
  );
}

export default App;

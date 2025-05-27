import { Route, Routes } from "react-router";
import LayoutAdmin from "./layouts/LayoutAdmin";
import Dashboard from "./pages/Dashboard";
import CartPage from "./pages/CartPage";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutAdmin />}>
        <Route path="/cart" element={<CartPage />}/>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

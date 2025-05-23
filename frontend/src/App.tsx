import { Route, Routes } from "react-router";
import LayoutAdmin from "./layouts/LayoutAdmin";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from './context/AuthContext';
import RegisterPage from './pages/RegisterPage';


function App() {
  return (
      <AuthProvider>
     <>
      <Routes>
        <Route path="/" element={<LayoutAdmin />}>
        <Route path="/register" element={<RegisterPage />} />
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </> 
    </AuthProvider>
  );
}

export default App;

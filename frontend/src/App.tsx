import { Route, Routes } from "react-router";
import LayoutAdmin from "./layouts/LayoutAdmin";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
      <AuthProvider>
     <>
      <Routes>
        <Route path="/" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </> 
    </AuthProvider>
  );
}

export default App;

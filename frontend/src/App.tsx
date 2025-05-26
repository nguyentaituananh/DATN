// import { Route, Routes } from "react-router";

// import { AuthProvider } from './context/AuthContext';
// import RegisterPage from "./pages/RegisterPage";
// import LayoutAdmin from "./layouts/LayoutAdmin";
// import Dashboard from "./pages/Dashboard";



// function App() {
//   return (
//       <AuthProvider>
//      <>
//       <Routes>
//         <Route path="/" element={<LayoutAdmin />}>
//         <Route path="/register" element={<RegisterPage/>} />
//           <Route index element={<Dashboard />} />
//         </Route>
//       </Routes>
//     </> 
//     </AuthProvider>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';

// Contexts
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';


// Layout
import Layout from './components/layout/Layout';

// Pages

import RegisterPage from './pages/RegisterPage';
import LayoutAdmin from './layouts/LayoutAdmin';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';


// Ant Design theme customization
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
          
            <Router>
              <Layout>
                <Routes>
                  <Route path="/admin" element={<LayoutAdmin />}></Route>
                   <Route index element={<Dashboard />} />
                  <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
            
                </Routes>
              </Layout>
            </Router>
          
        </CartProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
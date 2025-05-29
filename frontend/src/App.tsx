import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

import Layout from './components/layout/Layout';
import RegisterPage from './pages/RegisterPage';
import LayoutAdmin from './layouts/LayoutAdmin';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';

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
              <Route index element={<Dashboard />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;

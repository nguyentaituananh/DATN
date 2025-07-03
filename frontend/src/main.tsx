import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { App as AntdApp } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/reset.css";
import { OrderProvider } from "./context/OrderContext.tsx";
import { AuthProvider } from "./pages/context/AuthContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AntdApp> {/* 👈 Phải bao ngoài các Provider khác nếu có dùng message/notification */}
          <AuthProvider>
            {/* <OrderProvider> */}
              <App />
            {/* </OrderProvider> */}
          </AuthProvider>
        </AntdApp>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);

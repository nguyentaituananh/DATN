import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { DashboardPage } from "../../pages/admin/DashboardPage";
import { Search } from "./Sidebar/Search";
import ProductList from "../../pages/admin/products/ProductList";

const { Header, Sider } = Layout;

const LayoutAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: <NavLink to="dashboard">Dashboard</NavLink>,
    },
    {
      key: "product",
      icon: <ShoppingOutlined />,
      label: <NavLink to="product">Product</NavLink>,
    },
    {
      key: "user",
      icon: <UserOutlined />,
      label: <NavLink to="user">User</NavLink>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={220}
        style={{
          backgroundColor: "#F9FAFB",
          borderRight: "1px solid #E5E7EB",
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: "bold",
            padding: "16px",
            textAlign: "center",
            color: "#7C3AED",
          }}
        >
          {collapsed ? "AD" : "AdminPanel"}
        </div>
        <Search />
        <Menu
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={menuItems}
          style={{
            backgroundColor: "transparent",
            fontWeight: 500,
            color: "#374151",
          }}
        />
      </Sider>

      {/* Main layout */}

      <Layout>
        {/* Header */}

        <Header
          style={{
            padding: "0 24px",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 18 }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              fontWeight: 500,
              color: "#7C3AED",
            }}
          >
            <FaUserCircle size={24} />
            <span>Admin</span>
          </div>
        </Header>
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;

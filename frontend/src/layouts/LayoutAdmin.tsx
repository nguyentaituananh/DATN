<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, { useState } from "react";
>>>>>>> 55d107a72aa0df79e9a549e316f81d2abd82a840
import {
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  UserOutlined,
<<<<<<< HEAD
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { NavLink, Outlet } from 'react-router';
=======
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { NavLink, Outlet } from "react-router";
>>>>>>> 55d107a72aa0df79e9a549e316f81d2abd82a840

const { Header, Sider, Content } = Layout;

const LayoutAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    {
<<<<<<< HEAD
      key: '1',
=======
      key: "1",
>>>>>>> 55d107a72aa0df79e9a549e316f81d2abd82a840
      icon: <MenuOutlined />,
      label: <NavLink to="/">DashBoard</NavLink>,
    },
    {
<<<<<<< HEAD
      key: '2',
      icon: <ProductOutlined/>,
      label:  <NavLink to="/product">Product</NavLink>,
    },
    {
      key: '3',
      icon: <UserOutlined />,
      label: <NavLink to="/user">User</NavLink>,
    },
  ]

  return (
    <Layout style={{minHeight: '100vh'}}>
=======
      key: "2",
      icon: <ProductOutlined />,
      label: <NavLink to="/admin/product">Product</NavLink>,
    },
    {
      key: "3",
      icon: <UserOutlined />,
      label: <NavLink to="/user">User</NavLink>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
>>>>>>> 55d107a72aa0df79e9a549e316f81d2abd82a840
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
<<<<<<< HEAD
          defaultSelectedKeys={['1']}
          items={items}
        />
      </Sider>
      <Layout style={{ minHeight: '100vh' }}>
=======
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout style={{ minHeight: "100vh" }}>
>>>>>>> 55d107a72aa0df79e9a549e316f81d2abd82a840
        <Header style={{ padding: 0, background: "#fff" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
<<<<<<< HEAD
              fontSize: '16px',
=======
              fontSize: "16px",
>>>>>>> 55d107a72aa0df79e9a549e316f81d2abd82a840
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
<<<<<<< HEAD
            margin: '24px 16px',
=======
            margin: "24px 16px",
>>>>>>> 55d107a72aa0df79e9a549e316f81d2abd82a840
            padding: 24,
            minHeight: 280,
            background: "#fff",
            borderRadius: 3,
          }}
        >
          {/* Content */}
<<<<<<< HEAD
         <Outlet/>
=======
          <Outlet />
>>>>>>> 55d107a72aa0df79e9a549e316f81d2abd82a840
        </Content>
      </Layout>
    </Layout>
  );
};

<<<<<<< HEAD
export default LayoutAdmin;
=======
export default LayoutAdmin;
>>>>>>> 55d107a72aa0df79e9a549e316f81d2abd82a840

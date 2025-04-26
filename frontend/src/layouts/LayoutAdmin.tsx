import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { NavLink, Outlet } from 'react-router';

const { Header, Sider, Content } = Layout;

const LayoutAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    {
      key: '1',
      icon: <MenuOutlined />,
      label: <NavLink to="/">DashBoard</NavLink>,
    },
    {
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
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items}
        />
      </Sider>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ padding: 0, background: "#fff" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: "#fff",
            borderRadius: 3,
          }}
        >
          {/* Content */}
         <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
import React from "react";
import { Layout, Input } from "antd";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 50px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>
        Logo/Tên Trang Web
      </div>
      <div>
        <Input
          placeholder="Tìm sản phẩm..."
          style={{ width: 200, marginRight: 16 }}
          suffix={<SearchOutlined />}
        />
        <UserOutlined style={{ fontSize: "20px", marginRight: 16 }} />
        <ShoppingCartOutlined style={{ fontSize: "20px" }} />
      </div>
    </Header>
  );
};

export default HeaderComponent;

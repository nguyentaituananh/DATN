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
      <img src="" alt="" width={50} height={50} style={{ marginRight: -250 }} />
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>EcoDecore</div>
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

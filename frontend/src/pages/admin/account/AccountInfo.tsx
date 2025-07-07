import { Descriptions } from "antd";

const AccountInfo = () => (
  <Descriptions title="Thông tin tài khoản" bordered>
    <Descriptions.Item label="Họ tên">Tuấn Anh</Descriptions.Item>
    <Descriptions.Item label="Email">tuananh@gmail.com</Descriptions.Item>
    <Descriptions.Item label="Vai trò">Admin</Descriptions.Item>
    <Descriptions.Item label="Ngày tạo">2024-01-01</Descriptions.Item>
  </Descriptions>
);

export default AccountInfo;

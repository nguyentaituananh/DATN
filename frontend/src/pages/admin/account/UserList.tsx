import { Table } from "antd";

const columns = [
  { title: "Họ tên", dataIndex: "name" },
  { title: "Email", dataIndex: "email" },
  { title: "Vai trò", dataIndex: "role" },
  { title: "Ngày tạo", dataIndex: "createdAt" },
];

const data = [
  {
    key: "1",
    name: "Tuấn Anh",
    email: "tuananh@gmail.com",
    role: "Admin",
    createdAt: "2024-06-01",
  },
];

const UserList = () => <Table columns={columns} dataSource={data} />;

export default UserList;

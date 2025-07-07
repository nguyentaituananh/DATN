import { Table, Tag } from "antd";

const columns = [
  { title: "Mã đơn", dataIndex: "code" },
  { title: "Khách hàng", dataIndex: "customer" },
  { title: "Ngày đặt", dataIndex: "date" },
  { title: "Tổng tiền", dataIndex: "total" },
  {
    title: "Trạng thái",
    dataIndex: "status",
    render: (status: string) => (
      <Tag color={status === "Đã giao" ? "green" : "orange"}>{status}</Tag>
    ),
  },
];

const data = [
  {
    key: "1",
    code: "DH001",
    customer: "Tuấn Anh",
    date: "2024-06-26",
    total: "2,500,000₫",
    status: "Đã giao",
  },
];

const OrderList = () => <Table columns={columns} dataSource={data} />;

export default OrderList;

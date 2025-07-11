// import { Table, Tag } from "antd";

// const columns = [
//   { title: "Mã đơn", dataIndex: "code" },
//   { title: "Khách hàng", dataIndex: "customer" },
//   { title: "Ngày đặt", dataIndex: "date" },
//   { title: "Tổng tiền", dataIndex: "total" },
//   {
//     title: "Trạng thái",
//     dataIndex: "status",
//     render: (status: string) => (
//       <Tag color={status === "Đã giao" ? "green" : "orange"}>{status}</Tag>
//     ),
//   },
// ];

// const data = [
//   {
//     key: "1",
//     code: "DH001",
//     customer: "Tuấn Anh",
//     date: "2024-06-26",
//     total: "2,500,000₫",
//     status: "Đã giao",
//   },
// ];

// const OrderList = () => <Table columns={columns} dataSource={data} />;

// export default OrderList;

import { Table, Tag, Card } from "antd";
import type { ColumnsType } from "antd/es/table";

interface Order {
  key: string;
  code: string;
  customer: string;
  date: string;
  total: string;
  status: string;
}

const columns: ColumnsType<Order> = [
  {
    title: (
      <div className="flex items-center justify-center gap-1 text-purple-700 font-semibold text-base">
        🧾 Mã đơn
      </div>
    ),
    dataIndex: "code",
    align: "center",
  },
  {
    title: (
      <div className="flex items-center justify-center gap-1 text-blue-700 font-semibold text-base">
        👤 Khách hàng
      </div>
    ),
    dataIndex: "customer",
    align: "center",
  },
  {
    title: (
      <div className="flex items-center justify-center gap-1 text-sky-700 font-semibold text-base">
        📅 Ngày đặt
      </div>
    ),
    dataIndex: "date",
    align: "center",
  },
  {
    title: (
      <div className="flex items-center justify-center gap-1 text-green-700 font-semibold text-base">
        💰 Tổng tiền
      </div>
    ),
    dataIndex: "total",
    align: "center",
    render: (text: string) => (
      <span className="text-green-600 font-medium">{text}</span>
    ),
  },
  {
    title: (
      <div className="flex items-center justify-center gap-1 text-orange-600 font-semibold text-base">
        🚚 Trạng thái
      </div>
    ),
    dataIndex: "status",
    align: "center",
    render: (status: string) => (
      <Tag
        color={status === "Đã giao" ? "green" : "orange"}
        className="font-medium px-3 py-1 text-sm"
      >
        {status}
      </Tag>
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
  {
    key: "2",
    code: "DH002",
    customer: "Hoàng Duy",
    date: "2025-07-04",
    total: "1,200,000₫",
    status: "Đang xử lý",
  },
];

const OrderList = () => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        🧾 Danh sách đơn hàng
      </h2>
      <Card className="shadow-xl rounded-xl">
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered
            className="min-w-[900px]"
          />
        </div>
      </Card>
    </div>
  );
};

export default OrderList;

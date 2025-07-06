// import { Table } from "antd";

// const columns = [
//   { title: "Khách hàng", dataIndex: "customer" },
//   { title: "Sản phẩm", dataIndex: "product" },
//   { title: "Nội dung", dataIndex: "content" },
//   { title: "Ngày đăng", dataIndex: "date" },
// ];

// const data = [
//   {
//     key: "1",
//     customer: "Tuấn Anh",
//     product: "Ghế Sofa Zara",
//     content: "Rất đẹp, chất lượng tốt!",
//     date: "2024-06-25",
//   },
// ];

// const CommentList = () => <Table columns={columns} dataSource={data} />;

// export default CommentList;


import { Table, Card } from "antd";
import type { ColumnsType } from "antd/es/table";

interface Comment {
  key: string;
  customer: string;
  product: string;
  content: string;
  date: string;
}

const columns: ColumnsType<Comment> = [
  {
    title: (
      <div className="flex items-center justify-center gap-1 text-indigo-700 font-semibold">
        👤 Khách hàng
      </div>
    ),
    dataIndex: "customer",
    align: "center",
  },
  {
    title: (
      <div className="flex items-center justify-center gap-1 text-purple-700 font-semibold">
        🛋️ Sản phẩm
      </div>
    ),
    dataIndex: "product",
    align: "center",
  },
  {
    title: (
      <div className="flex items-center justify-center gap-1 text-gray-700 font-semibold">
        💬 Nội dung
      </div>
    ),
    dataIndex: "content",
    align: "center",
    render: (text: string) => (
      <span className="text-gray-700 font-medium">{text}</span>
    ),
  },
  {
    title: (
      <div className="flex items-center justify-center gap-1 text-blue-700 font-semibold">
        📅 Ngày đăng
      </div>
    ),
    dataIndex: "date",
    align: "center",
    render: (text: string) => (
      <span className="text-gray-700 font-medium">{text}</span>
    ),
  },
];

const data: Comment[] = [
  {
    key: "1",
    customer: "Tuấn Anh",
    product: "Ghế Sofa Zara",
    content: "Rất đẹp, chất lượng tốt!",
    date: "2024-06-25",
  },
  {
    key: "2",
    customer: "Hoàng Duy",
    product: "Bàn làm việc ",
    content: "Giao hàng nhanh, rất hài lòng!",
    date: "2025-07-05",
  },
];

const CommentList = () => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        💬 Danh sách bình luận
      </h2>
      <Card className="shadow-lg rounded-xl">
        <div className="overflow-x-auto">
          <Table<Comment>
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered
            className="min-w-[800px]"
          />
        </div>
      </Card>
    </div>
  );
};

export default CommentList;


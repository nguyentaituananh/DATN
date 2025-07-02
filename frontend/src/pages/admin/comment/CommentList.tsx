import { Table } from "antd";

const columns = [
  { title: "Khách hàng", dataIndex: "customer" },
  { title: "Sản phẩm", dataIndex: "product" },
  { title: "Nội dung", dataIndex: "content" },
  { title: "Ngày đăng", dataIndex: "date" },
];

const data = [
  {
    key: "1",
    customer: "Tuấn Anh",
    product: "Ghế Sofa Zara",
    content: "Rất đẹp, chất lượng tốt!",
    date: "2024-06-25",
  },
];

const CommentList = () => <Table columns={columns} dataSource={data} />;

export default CommentList;

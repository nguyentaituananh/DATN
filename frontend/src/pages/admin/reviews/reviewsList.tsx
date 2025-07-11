import { Table, Card } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useReview } from "../../../context/reviewsContext";

interface Review {
  id: number;
  customer: string;
  product: string;
  content: string;
  date: string;
}

const ReviewList = () => {
  const { reviews } = useReview();

  const columns: ColumnsType<Review> = [
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

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        💬 Danh sách đánh giá
      </h2>
      <Card className="shadow-lg rounded-xl">
        <div className="overflow-x-auto">
          <Table<Review>
            columns={columns}
            dataSource={reviews}
            rowKey="id"
            pagination={false}
            bordered
            className="min-w-[800px]"
          />
        </div>
      </Card>
    </div>
  );
};

export default ReviewList;

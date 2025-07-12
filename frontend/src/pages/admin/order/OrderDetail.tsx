import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Descriptions, Card, Tag, Spin } from "antd";
import instanceAxios from "../../../utils/instanceAxios";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instanceAxios.get(`/api/orders/${id}`);
        setOrder(data);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết đơn hàng", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <Spin tip="Đang tải chi tiết đơn hàng..." />;

  if (!order) return <p>Không tìm thấy đơn hàng</p>;

  const total = order.products.reduce(
    (acc: number, p: any) => acc + p.price * p.quantity,
    0
  );

  const renderStatus = (status: string) => {
    switch (status) {
      case "pending":
        return <Tag color="orange">⏳ Chờ xử lý</Tag>;
      case "shipped":
        return <Tag color="blue">🚚 Đã giao</Tag>;
      case "done":
        return <Tag color="green">✅ Hoàn thành</Tag>;
      default:
        return <Tag>Không rõ</Tag>;
    }
  };

  return (
    <Card title={`🧾 Chi tiết đơn hàng ${order._id.slice(-6).toUpperCase()}`}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Người dùng">
          {order.user_id
            ? `${order.user_id.customer_code} - ${order.user_id.name}`
            : "Không rõ"}
        </Descriptions.Item>

        <Descriptions.Item label="Địa chỉ giao hàng">
          {order.shipping_address}
        </Descriptions.Item>

        <Descriptions.Item label="Ngày đặt hàng">
          {new Date(order.order_date).toLocaleDateString("vi-VN")}
        </Descriptions.Item>

        <Descriptions.Item label="Trạng thái">
          {renderStatus(order.status)}
        </Descriptions.Item>

        <Descriptions.Item label="Sản phẩm">
          <ul className="list-disc pl-4">
            {order.products.map((p: any, idx: number) => (
              <li key={idx}>
                {p.product_id?.name || `ID: ${p.product_id}`} – SL: {p.quantity} –{" "}
                Giá: {p.price.toLocaleString()}₫
              </li>
            ))}
          </ul>
        </Descriptions.Item>

        <Descriptions.Item label="Tổng tiền">
          <strong>{total.toLocaleString()}₫</strong>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default OrderDetail;
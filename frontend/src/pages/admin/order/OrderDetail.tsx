import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Descriptions, Card, Tag } from "antd";
import instanceAxios from "../../../utils/instanceAxios";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { data } = await instanceAxios.get(`/api/orders/${id}`);
      setOrder(data);
    })();
  }, [id]);

  if (!order) return <p>Đang tải...</p>;

  const total = order.products.reduce(
    (acc: number, p: any) => acc + p.price * p.quantity,
    0
  );

  return (
    <Card title={`🧾 Chi tiết đơn hàng ${order._id.slice(-6).toUpperCase()}`}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Người dùng">
          {order.user_id?.name || order.user_id}
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ giao hàng">
          {order.shipping_address}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày đặt hàng">
          {new Date(order.order_date).toLocaleDateString("vi-VN")}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          <Tag color={order.status === "done" ? "green" : "orange"}>
            {order.status === "pending"
              ? "Chờ xử lý"
              : order.status === "shipped"
              ? "Đã giao"
              : "Hoàn thành"}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Sản phẩm">
          <ul>
            {order.products.map((p: any, idx: number) => (
              <li key={idx}>
                ID: {p.product_id} | SL: {p.quantity} | Giá:{" "}
                {p.price.toLocaleString()}₫
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

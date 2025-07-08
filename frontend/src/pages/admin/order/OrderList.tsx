import { Table, Tag, Button, Popconfirm, message, Card } from "antd";
import { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import instanceAxios from "../../../utils/instanceAxios";
import type { ColumnsType } from "antd/es/table";

interface Order {
  key: string;
  code: string;
  customer: string;
  date: string;
  total: string;
  address: string;
  status: string;
  products: string;
  quantity: number;
  rawStatus: string; // thêm để xử lý logic
}

const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const { data } = await instanceAxios.get("/api/orders");
      console.log(data)
      const formatted = data.map((o: any): Order => ({
        key: o._id,
        code: o._id.slice(-6).toUpperCase(),
        customer: o.user_id ? `${o.user_id.customer_code} - ${o.user_id.name}`: "Không rõ",
        date: new Date(o.order_date).toLocaleDateString("vi-VN"),
        total: `${o.products.reduce((acc: number, p: any) => acc + p.price * p.quantity,0).toLocaleString()}₫`,
        quantity: o.products.reduce((acc: number, p: any) => acc + p.quantity, 0),
        address: o.shipping_address || "Chưa có địa chỉ",
        products: o.products.map((p: any) => p.product_id?.name || "Sản phẩm").join(", "),
        status:
          o.status === "done"
            ? "✅ Hoàn thành"
            : o.status === "shipped"
            ? "🚚 Đã giao"
            : "⏳ Chờ xử lý",
        rawStatus: o.status,
      }));

      setOrders(formatted);
    } catch (err) {
      message.error("Lỗi khi tải đơn hàng");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await instanceAxios.delete(`/api/orders/${id}`);
      message.success("Đã xoá đơn hàng");
      fetchOrders();
    } catch {
      message.error("Lỗi khi xoá đơn hàng");
    }
  };

  const columns: ColumnsType<Order> = [
    { title: "Mã đơn", dataIndex: "code", align: "center" },
    { title: "Khách hàng", dataIndex: "customer", align: "center" },
    { title: "Ngày đặt", dataIndex: "date", align: "center" },
    { title: "Địa chỉ", dataIndex: "address", align: "center" },
    { title: "Sản phẩm", dataIndex: "products", align: "center" },
    
    {
      title: "Tổng tiền",
      dataIndex: "total",
      align: "center",
      render: (text: string) => (
        <span style={{ color: "green", fontWeight: 500 }}>{text}</span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      align: "center",
      render: (status: string) => <Tag>{status}</Tag>,
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      align: "center",
      render: (_: any, record: Order) => (
        <div className="flex gap-2 justify-center flex-wrap">
          <Button
            type="default"
            onClick={() => navigate(`/admin/order/${record.key}`)}
          >
            Xem chi tiết
          </Button>
          {record.rawStatus !== "done" && (
            <>
              <Button onClick={() => navigate(`/admin/order/edit/${record.key}`)}>
                Sửa
              </Button>
              <Popconfirm
                title="Xác nhận xoá?"
                onConfirm={() => handleDelete(record.key)}
              >
                <Button danger>Xoá</Button>
              </Popconfirm>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          🧾 Danh sách đơn hàng
        </h2>
        <Button type="primary" onClick={() => navigate("/admin/order/create")}>
          ➕ Thêm đơn hàng
        </Button>
      </div>

      <Card className="shadow-xl rounded-xl">
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={orders}
            pagination={{ pageSize: 5 }}
            bordered
            className="min-w-[1000px]"
          />
        </div>
      </Card>
    </div>
  );
};

export default OrderList;

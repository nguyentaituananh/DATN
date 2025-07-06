import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Popconfirm, message } from "antd";
import { useNavigate } from "react-router-dom";
import instanceAxios from "../../../utils/instanceAxios";
import { EyeOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const OrderList = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await instanceAxios.get("/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi tải đơn hàng.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await instanceAxios.delete(`/api/orders/${id}`);
      message.success("Đã xoá đơn hàng.");
      fetchOrders();
    } catch (err) {
      console.error(err);
      message.error("Xoá thất bại.");
    }
  };

  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "_id",
      render: (text: string) => (
        <span className="font-semibold">{text.slice(-6).toUpperCase()}</span>
      ),
    },
    {
      title: "Khách hàng",
      dataIndex: "user_id",
      render: (user: any) => user?.name || "Ẩn danh",
    },
    {
      title: "Ngày đặt",
      dataIndex: "order_date",
      render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Tổng tiền",
      dataIndex: "products",
      render: (products: any[]) => {
        const total = products.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        return `${total.toLocaleString()} ₫`;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "done"
              ? "green"
              : status === "shipped"
              ? "blue"
              : "orange"
          }
        >
          {status === "done"
            ? "Hoàn tất"
            : status === "shipped"
            ? "Đã giao"
            : "Chờ xử lý"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      render: (_: any, record: any) => (
        <div className="space-x-2">
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate(`/admin/orders/${record._id}`)}
          >
            Xem
          </Button>
          <Popconfirm
            title="Xác nhận xoá đơn hàng này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <Button danger icon={<DeleteOutlined />}>
              Xoá
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-xl shadow space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Danh sách đơn hàng</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/admin/order/create")}
          size="large"
        >
          Thêm đơn hàng
        </Button>
      </div>

      <Table
        dataSource={orders}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 6 }}
        bordered
        size="middle"
      />
    </div>
  );
};

export default OrderList;

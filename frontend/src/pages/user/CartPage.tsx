import React, { useEffect, useState } from "react";
import { Typography, Table, Image, Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const currency = new Intl.NumberFormat("vi-VN");

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variantId: string;
  variantName: string;
  variantSku: string;
  variantAttributes: {
    size?: string;
    color?: string;
    dimensions?: string;
  };
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      }
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  }, []);

  const handleRemove = (variantId: string) => {
    const updated = cartItems.filter(item => item.variantId !== variantId);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    message.success("Đã xóa sản phẩm khỏi giỏ hàng");
  };

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      render: (_: any, record: CartItem) => (
        <div className="flex items-center space-x-4">
          <Image
            width={80}
            src={record.image}
            fallback="/images/placeholder.jpg"
            alt={record.name}
          />
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-xs text-gray-500">
              {record.variantName} - SKU: {record.variantSku}
            </div>
            <div className="text-xs text-gray-400">
              {record.variantAttributes.size} | {record.variantAttributes.color} |{" "}
              {record.variantAttributes.dimensions}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (price: number) => `${currency.format(price)} đ`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Tạm tính",
      key: "total",
      render: (_: any, record: CartItem) =>
        `${currency.format(record.price * record.quantity)} đ`,
    },
    {
      title: "",
      key: "actions",
      render: (_: any, record: CartItem) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemove(record.variantId)}
        />
      ),
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white">
      <Title level={2}>Giỏ hàng</Title>

      {cartItems.length === 0 ? (
        <Text>Giỏ hàng của bạn đang trống.</Text>
      ) : (
        <>
          <Table
            dataSource={cartItems}
            columns={columns}
            rowKey={(item) => item.variantId}
            pagination={false}
          />

          <div className="mt-6 text-right space-y-2">
            <div>
              <Text strong>Tạm tính: </Text>
              <Text>{currency.format(subtotal)} đ</Text>
            </div>
            <div>
              <Text strong>Tổng cộng: </Text>
              <Text>{currency.format(subtotal)} đ</Text>
            </div>
            <Button type="primary" size="large" className="mt-4">
              Tiến hành thanh toán
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;

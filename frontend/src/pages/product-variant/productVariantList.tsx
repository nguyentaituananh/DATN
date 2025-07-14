import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Space, Typography } from "antd";
import {
  fetchAllVariants,
  deleteVariant,
} from "../../api/productVariantApi";
import { ProductVariant } from "../../types";
import { useNavigate } from "react-router-dom";

const ProductVariantList = () => {
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadVariants = async () => {
    try {
      setLoading(true);
      const data = await fetchAllVariants();
      setVariants(data);
    } catch (error) {
      message.error("Không thể tải danh sách biến thể");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVariants();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteVariant(id);
      message.success("Xoá thành công!");
      loadVariants();
    } catch (err) {
      message.error("Xoá thất bại");
    }
  };

  const columns = [
    {
      title: "SKU",
      dataIndex: "sku",
    },
    {
      title: "Giá gốc",
      dataIndex: "price",
      render: (val: number) =>
        val.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    {
      title: "Giá KM",
      dataIndex: "discount_price",
      render: (val: number) =>
        val
          ? val.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
          : "-",
    },
    {
      title: "Kho",
      dataIndex: "stock_quantity",
    },
    {
      title: "Màu",
      dataIndex: ["attributes", "color"],
    },
    {
      title: "Size",
      dataIndex: ["attributes", "size"],
    },
    {
      title: "Kích thước",
      dataIndex: ["attributes", "dimensions"],
    },
    {
      title: "Hành động",
      render: (_: any, record: ProductVariant) => (
        <Space>
          <Button
            type="link"
            onClick={() =>
              navigate(`/admin/product-variant/edit/${record._id}`)
            }
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xoá?"
            onConfirm={() => handleDelete(record._id!)}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <Button danger type="link">
              Xoá
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-lg shadow max-w-6xl mx-auto">
        <Typography.Title level={4}>📦 Danh sách Biến thể sản phẩm</Typography.Title>

        <Table
          dataSource={variants}
          columns={columns}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default ProductVariantList;

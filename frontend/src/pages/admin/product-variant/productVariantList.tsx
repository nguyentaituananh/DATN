import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Popconfirm,
  message,
  Space,
  Typography,
  Tag,
  Image,
} from "antd";
import {
  fetchAllVariants,
  deleteVariant,
} from "../../../api/productVariantApi";
import { ProductVariant } from "../../../types";
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
      title: "Hình ảnh",
      dataIndex: "images",
      key: "images",
      width: 150,
      render: (images: string[]) => (
        <Image.PreviewGroup>
          <div className="flex gap-1">
            {images?.slice(0, 3).map((img, idx) => (
              <Image
                key={idx}
                src={img}
                width={48}
                height={48}
                style={{
                  objectFit: "cover",
                  borderRadius: 6,
                  border: "1px solid #eee",
                }}
                preview
                placeholder
              />
            ))}
          </div>
        </Image.PreviewGroup>
      ),
    },
    {
      title: "Sản phẩm",
      dataIndex: "product_id",
      render: (product: any) => product?.name || "N/A",
    },
    {
      title: "SKU",
      dataIndex: "sku",
    },
    {
      title: "Giá gốc",
      dataIndex: "price",
      render: (val: number) =>
        val?.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
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
      title: "Trạng thái",
      dataIndex: "is_active",
      render: (active: boolean) =>
        active ? (
          <Tag color="green">Hoạt động</Tag>
        ) : (
          <Tag color="red">Tạm dừng</Tag>
        ),
    },
    {
      title: "Hành động",
      fixed: "right" as const,
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
      <div className="bg-white p-6 rounded-xl shadow max-w-full mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Typography.Title level={4} className="!mb-0">
            📦 Danh sách Biến thể sản phẩm
          </Typography.Title>
          <Button
            type="primary"
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={() => navigate("/admin/product-variant/create")}
          >
            ➕ Thêm mới
          </Button>
        </div>

        <Table
          dataSource={variants}
          columns={columns}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1200 }}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ProductVariantList;

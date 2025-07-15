import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Typography,
  message,
} from "antd";
import { createVariant } from "../../../api/productVariantApi";
import { fetchAllProducts } from "../../../api/productApi";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AddProductVariant: React.FC = () => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (error) {
        message.error("Không thể tải danh sách sản phẩm");
      }
    };
    loadProducts();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      await createVariant(values);
      message.success("Tạo biến thể thành công!");
      form.resetFields();
      navigate("/admin/product-variant");
    } catch (err: any) {
      console.error(err);
      message.error("Tạo biến thể thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm p-8 max-w-3xl mx-auto">
        <Typography.Title level={4}>➕ Thêm mới Biến thể</Typography.Title>

        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            name="product_id"
            label="Sản phẩm"
            rules={[{ required: true, message: "Vui lòng chọn sản phẩm" }]}
          >
            <Select placeholder="Chọn sản phẩm">
              {products.map((p) => (
                <Option key={p._id} value={p._id}>
                  {p.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="sku"
            label="Mã SKU"
            rules={[{ required: true, message: "Vui lòng nhập SKU" }]}
          >
            <Input placeholder="VD: SP001-RED-M" />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="price"
              label="Giá bán"
              rules={[{ required: true, message: "Nhập giá bán" }]}
            >
              <InputNumber
                min={0}
                className="w-full"
                placeholder="VD: 300000"
                formatter={(value) =>
                  value
                    ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ"
                    : ""
                }
                parser={(value) => value?.replace(/[^\d]/g, "")}
              />
            </Form.Item>

            <Form.Item
              name="discount_price"
              label="Giá khuyến mãi"
              rules={[{ required: false }]}
            >
              <InputNumber
                min={0}
                className="w-full"
                placeholder="VD: 270000"
                formatter={(value) =>
                  value
                    ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ"
                    : ""
                }
                parser={(value) => value?.replace(/[^\d]/g, "")}
              />
            </Form.Item>
          </div>

          <Form.Item
            name="stock_quantity"
            label="Số lượng tồn kho"
            rules={[{ required: true, message: "Vui lòng nhập tồn kho" }]}
          >
            <InputNumber min={0} className="w-full" placeholder="VD: 50" />
          </Form.Item>

          {/* Attribute Fields */}
          <Typography.Text strong>Thông tin thuộc tính</Typography.Text>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <Form.Item name={["attributes", "color"]} label="Màu sắc">
              <Input placeholder="VD: Đỏ" />
            </Form.Item>
            <Form.Item name={["attributes", "size"]} label="Size">
              <Input placeholder="VD: M, L, XL" />
            </Form.Item>
            <Form.Item name={["attributes", "dimensions"]} label="Kích thước">
              <Input placeholder="VD: 40x50x60cm" />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
            >
              Tạo biến thể
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddProductVariant;

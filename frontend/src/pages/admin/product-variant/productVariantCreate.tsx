import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Typography,
  message,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { createVariant } from "../../../api/productVariantApi";
import { fetchAllProducts } from "../../../api/productApi";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AddProductVariant: React.FC = () => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
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

      const formData = new FormData();
      formData.append("product_id", values.product_id);
      formData.append("sku", values.sku);
      formData.append("price", values.price.toString());
      formData.append("stock_quantity", values.stock_quantity.toString());
      if (values.discount_price !== undefined && values.discount_price !== null) {
        formData.append("discount_price", values.discount_price.toString());
      }

      if (values.attributes?.color) {
        formData.append("attributes[color]", values.attributes.color);
      }
      if (values.attributes?.size) {
        formData.append("attributes[size]", values.attributes.size);
      }
      if (values.attributes?.dimensions) {
        formData.append("attributes[dimensions]", values.attributes.dimensions);
      }

      fileList.forEach((file) => {
        formData.append("images", file.originFileObj);
      });

      // Debug formData
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      await createVariant(formData);
      message.success("Tạo biến thể thành công!");
      form.resetFields();
      setFileList([]);
      navigate("/admin/product-variant");
    } catch (err: any) {
      console.error("❌ Lỗi:", err);
      message.error(err.response?.data?.message || "Tạo biến thể thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm p-8 w-full max-w-screen-xl mx-auto">
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

            <Form.Item name="discount_price" label="Giá khuyến mãi">
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

          <Form.Item label="Ảnh sản phẩm">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={() => false}
              multiple
              className="!w-full"
            >
              {fileList.length < 5 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Tải ảnh</div>
                </div>
              )}
            </Upload>
          </Form.Item>

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

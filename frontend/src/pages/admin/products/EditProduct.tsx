import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  InputNumber,
  Upload,
  Button,
  Select,
  message,
  Typography,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import instanceAxios from "../../../utils/instanceAxios";

const { TextArea } = Input;
const { Option } = Select;

const EditProducts: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [categories, setCategories] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    const [catRes, prodRes, productRes] = await Promise.all([
      instanceAxios.get("/api/categories"),
      instanceAxios.get("/api/products"),
      instanceAxios.get(`/api/products/${id}`),
    ]);

    setCategories(catRes.data || []);
    setAllProducts(prodRes.data || []);

    const product = productRes.data;
    form.setFieldsValue({
      name: product.name,
      description: product.description,
      price: product.price,
      discount_price: product.discount_price,
      category_id: product.category_id?._id || "",
      related_products: product.related_products?.map((p: any) => p._id) || [],
    });
    setImagePreviews(product.images || []);
  };

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      await instanceAxios.put(`/api/products/${id}`, values);
      message.success("Cập nhật sản phẩm thành công!");
      navigate("/admin/product");
    } catch (err: any) {
      console.error("Lỗi cập nhật:", err);
      message.error(err.response?.data?.message || "Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm p-8 w-full max-w-6xl mx-auto">
        <Typography.Title level={4} className="mb-6">
          ✏️ Chỉnh sửa sản phẩm
        </Typography.Title>

        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
          >
            <Input placeholder="VD: Sofa xám cao cấp" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <TextArea rows={4} placeholder="Nhập mô tả sản phẩm..." />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="price"
              label="Giá gốc"
              rules={[{ required: true, message: "Vui lòng nhập giá" }]}
            >
              <InputNumber
                min={0}
                className="w-full"
                placeholder="VD: 2,000,000"
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
                placeholder="VD: 1,800,000"
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
            name="category_id"
            label="Danh mục"
            rules={[{ required: true, message: "Chọn danh mục" }]}
          >
            <Select placeholder="Chọn danh mục">
              {categories.map((cat) => (
                <Option key={cat._id} value={cat._id}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="related_products" label="Sản phẩm liên quan">
            <Select mode="multiple" placeholder="Chọn sản phẩm liên quan">
              {allProducts.map((p) => (
                <Option key={p._id} value={p._id}>
                  {p.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Ảnh sản phẩm">
            <div className="flex gap-2 flex-wrap">
              {imagePreviews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`preview-${idx}`}
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
            >
              Cập nhật sản phẩm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditProducts;

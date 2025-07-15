import React, { useEffect, useState } from "react";
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
import { RcFile } from "antd/es/upload";
import { createProduct } from "../../../api/productApi";
import { getAllCategories } from "../../../api/categoryAPI";
import { fetchAllProducts } from "../../../api/productApi";

const { TextArea } = Input;
const { Option } = Select;

const CreateProducts: React.FC = () => {
  const [form] = Form.useForm();
  const [imageFiles, setImageFiles] = useState<RcFile[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const [cats, products] = await Promise.all([
        getAllCategories(),
        fetchAllProducts(),
      ]);
      setCategories(cats.data || []);
      setAllProducts(products || []);
    };
    loadData();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("discount_price", values.discount_price || 0);
      formData.append("category_id", values.category_id);

      if (values.related_products?.length) {
        values.related_products.forEach((id: string) =>
          formData.append("related_products", id)
        );
      }

      imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      setLoading(true);
      await createProduct(formData);
      message.success("Tạo sản phẩm thành công!");
      form.resetFields();
      setImageFiles([]);
    } catch (err) {
      console.error("Lỗi tạo sản phẩm:", err);
      message.error("Tạo sản phẩm thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm p-8 w-full">
        <Typography.Title level={4} className="mb-6">
          ➕ Thêm mới sản phẩm
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
            <Upload
              beforeUpload={(file) => {
                setImageFiles((prev) => [...prev, file]);
                return false;
              }}
              fileList={imageFiles.map((file) => ({
                uid: file.uid,
                name: file.name,
                status: "done",
                url: URL.createObjectURL(file),
              }))}
              listType="picture"
              onRemove={(file) => {
                setImageFiles((prev) =>
                  prev.filter((f) => f.uid !== file.uid)
                );
              }}
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
            >
              Tạo sản phẩm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateProducts;

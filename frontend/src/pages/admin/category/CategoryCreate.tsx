import {
  Form,
  Input,
  Select,
  Button,
  Card,
  message,
  App as AntdApp,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instanceAxios from "../../../utils/instanceAxios";

const { Option } = Select;

const CategoryCreate = () => {
  const { message } = AntdApp.useApp();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [parentCategories, setParentCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Gọi API lấy danh mục cha
  const fetchParentCategories = async () => {
    try {
      const { data } = await instanceAxios.get("/api/categories");
      setParentCategories(data);
    } catch (error) {
      message.error("Không thể tải danh mục cha");
    }
  };

  useEffect(() => {
    fetchParentCategories();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      await instanceAxios.post("/api/categories", values);
      message.success("✅ Thêm danh mục thành công");
      navigate("/admin/category");
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || "❌ Thêm danh mục thất bại"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="➕ Thêm danh mục" className="shadow-xl rounded-xl">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
        >
          <Input placeholder="Ví dụ: Bàn làm việc" />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea placeholder="Nhập mô tả (không bắt buộc)" />
        </Form.Item>

        <Form.Item label="Danh mục cha" name="parent_category_id">
          <Select allowClear placeholder="Chọn danh mục chính (nếu có)">
            {parentCategories.map((cat) => (
              <Option key={cat._id} value={cat._id}>
                {cat.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Tạo danh mục
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CategoryCreate;

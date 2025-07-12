import {
  Form,
  Input,
  Select,
  Button,
  Card,
  App as AntdApp,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instanceAxios from "../../../utils/instanceAxios";

const { Option } = Select;

const EditCategory = () => {
  const { id } = useParams(); // lấy ID danh mục cần sửa
  const navigate = useNavigate();
  const { message } = AntdApp.useApp();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [parentCategories, setParentCategories] = useState<any[]>([]);

  // Lấy dữ liệu danh mục hiện tại
  const fetchCategory = async () => {
    try {
      const { data } = await instanceAxios.get(`/api/categories`);
      const current = data.find((c: any) => c._id === id);
      if (!current) return message.error("Không tìm thấy danh mục");

      // Loại bỏ chính nó khỏi danh sách danh mục cha
      const otherCategories = data.filter((c: any) => c._id !== id);
      setParentCategories(otherCategories);

      form.setFieldsValue({
        name: current.name,
        description: current.description,
        parent_category_id: current.parent_category_id || undefined,
      });
    } catch (error) {
      message.error("Không thể tải dữ liệu danh mục");
    }
  };

  useEffect(() => {
    if (id) fetchCategory();
  }, [id]);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      await instanceAxios.put(`/api/categories/${id}`, values);
      message.success("✅ Cập nhật danh mục thành công");
      navigate("/admin/category");
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || "❌ Cập nhật danh mục thất bại"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="✏️ Sửa danh mục" className="shadow-xl rounded-xl">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea />
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
            Cập nhật danh mục
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditCategory;

import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Select,
  Form,
  InputNumber,
  Space,
  Card,
  DatePicker,
  App as AntdApp,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import instanceAxios from "../../../utils/instanceAxios";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const { Option } = Select;

const EditOrder = () => {
  const { message } = AntdApp.useApp();
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await instanceAxios.get(`/api/orders/${id}`);
        setUserId(data.user_id); // lưu riêng user_id để đưa vào payload
        form.setFieldsValue({
          ...data,
          order_date: dayjs(data.order_date),
        });
      } catch (error) {
        message.error("Không thể tải dữ liệu đơn hàng");
      }
    };

    fetchOrder();
  }, [id]);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        user_id: userId, // dùng từ state
        order_date: values.order_date?.toISOString(),
      };
      await instanceAxios.put(`/api/orders/${id}`, payload);
      message.success("✅ Cập nhật thành công");
      navigate("/admin/order");
    } catch (error: any) {
      message.error(error?.response?.data?.message || "❌ Lỗi khi cập nhật");
    } finally {
      setLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);

  return (
    <Card title="✏️ Sửa đơn hàng" bordered={false} className="shadow-lg rounded-xl">
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        {/* ✅ Hiển thị user_id nhưng disabled */}
        <Form.Item label="ID người dùng">
          <Input value={userId} disabled />
        </Form.Item>

        <Form.Item label="Địa chỉ giao hàng" name="shipping_address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Ngày đặt hàng" name="order_date" rules={[{ required: true }]}>
          <DatePicker format="YYYY-MM-DD" className="w-full" />
        </Form.Item>

        <Form.Item label="Trạng thái" name="status">
          <Select>
            <Option value="pending">Chờ xử lý</Option>
            <Option value="shipped">Đã giao</Option>
            <Option value="done">Hoàn thành</Option>
          </Select>
        </Form.Item>

        <Form.List name="products">
          {(fields, { add, remove }) => (
            <>
              <label className="font-medium text-base">Sản phẩm</label>
              {fields.map(({ key, name, ...rest }) => (
                <Space key={key} align="baseline" wrap style={{ marginBottom: 8 }}>
                  <Form.Item {...rest} name={[name, "product_id"]} rules={[{ required: true }]}>
                    <Input placeholder="Product ID" />
                  </Form.Item>
                  <Form.Item {...rest} name={[name, "quantity"]} rules={[{ required: true }]}>
                    <InputNumber min={1} placeholder="SL" />
                  </Form.Item>
                  <Form.Item {...rest} name={[name, "price"]} rules={[{ required: true }]}>
                    <InputNumber
                      min={0}
                      placeholder="Giá (VNĐ)"
                      formatter={(v) => v!.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} className="text-red-500" />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Thêm sản phẩm
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cập nhật đơn hàng
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditOrder;

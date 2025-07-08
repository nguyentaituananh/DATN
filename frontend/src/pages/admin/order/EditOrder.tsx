import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Form,
  InputNumber,
  Space,
  Card,
  DatePicker,
  Select,
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
  const [loading, setLoading] = useState(false);
  const [userNameDisplay, setUserNameDisplay] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await instanceAxios.get(`/api/orders/${id}`);

        if (data.user_id) {
          // user_id là object chứa thông tin user
          form.setFieldValue("user_id", data.user_id._id);
          setUserNameDisplay(`${data.user_id.customer_code} - ${data.user_id.name}`);
        }

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

  return (
    <Card title="✏️ Sửa đơn hàng" bordered={false} className="shadow-lg rounded-xl">
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        {/* ✅ Trường user_id ẩn để gửi kèm khi cập nhật */}
        <Form.Item name="user_id" hidden>
          <Input />
        </Form.Item>

        {/* ✅ Hiển thị tên khách hàng (không cho sửa) */}
        <Form.Item label="Khách hàng">
          <Input value={userNameDisplay} disabled />
        </Form.Item>

        <Form.Item
          label="Địa chỉ giao hàng"
          name="shipping_address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
        >
          <Input placeholder="VD: 123 Nguyễn Huệ, Q1" />
        </Form.Item>

        <Form.Item
          label="Ngày đặt hàng"
          name="order_date"
          rules={[{ required: true, message: "Chọn ngày đặt hàng" }]}
        >
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
                  <Form.Item
                    {...rest}
                    name={[name, "product_id"]}
                    rules={[{ required: true, message: "Nhập ID sản phẩm" }]}
                  >
                    <Input placeholder="Product ID" />
                  </Form.Item>
                  <Form.Item
                    {...rest}
                    name={[name, "quantity"]}
                    rules={[{ required: true, message: "Nhập số lượng" }]}
                  >
                    <InputNumber min={1} placeholder="SL" />
                  </Form.Item>
                  <Form.Item
                    {...rest}
                    name={[name, "price"]}
                    rules={[{ required: true, message: "Nhập giá sản phẩm" }]}
                  >
                    <InputNumber
                      min={0}
                      placeholder="Giá (VNĐ)"
                      formatter={(v) => v!.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    />
                  </Form.Item>
                  <MinusCircleOutlined
                    onClick={() => remove(name)}
                    className="text-red-500"
                  />
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

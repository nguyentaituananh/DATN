import { useState } from "react";
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
import dayjs from "dayjs";

const { Option } = Select;

const OrderForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { message } = AntdApp.useApp();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values: any) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        order_date: values.order_date?.toISOString(),
      };
      await instanceAxios.post("/api/orders", payload);
      message.success("✅ Đã thêm đơn hàng");
      onSuccess?.();
    } catch (error: any) {
      message.error(error?.response?.data?.message || "❌ Thêm thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="➕ Thêm mới đơn hàng" bordered={false} className="shadow-lg rounded-xl">
      <Form
        onFinish={handleFinish}
        layout="vertical"
        initialValues={{
          status: "pending",
          products: [{}],
          order_date: dayjs(),
        }}
      >
        {/* --- thông tin người dùng & địa chỉ --- */}
        <Form.Item label="ID người dùng" name="user_id" rules={[{ required: true }]}>
          <Input placeholder="ObjectId người dùng" />
        </Form.Item>

        <Form.Item label="Địa chỉ giao hàng" name="shipping_address" rules={[{ required: true }]}>
          <Input placeholder="123 Nguyễn Huệ, Q1" />
        </Form.Item>

        {/* --- ngày đặt hàng --- */}
        <Form.Item label="Ngày đặt hàng" name="order_date" rules={[{ required: true }]}>
          <DatePicker format="YYYY-MM-DD" className="w-full" placeholder="Chọn ngày" />
        </Form.Item>

        {/* --- trạng thái --- */}
        <Form.Item label="Trạng thái" name="status">
          <Select>
            <Option value="pending">Chờ xử lý</Option>
            <Option value="shipped">Đã giao</Option>
            <Option value="done">Hoàn thành</Option>
          </Select>
        </Form.Item>

        {/* --- danh sách sản phẩm --- */}
        <Form.List name="products">
          {(fields, { add, remove }) => (
            <>
              <label className="font-medium text-base">Sản phẩm</label>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end">
                  <Form.Item
                    {...restField}
                    name={[name, "product_id"]}
                    rules={[{ required: true, message: "Vui lòng nhập ID sản phẩm" }]}
                  >
                    <Input placeholder="Product ID" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "quantity"]}
                    rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
                  >
                    <InputNumber placeholder="SL" min={1} className="w-full" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "price"]}
                    rules={[{ required: true, message: "Vui lòng nhập giá" }]}
                  >
                    <InputNumber
                      placeholder="Giá (VNĐ)"
                      min={0}
                      className="w-full"
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>

                  <Button
                    danger
                    type="text"
                    icon={<MinusCircleOutlined />}
                    onClick={() => remove(name)}
                    className="text-red-500"
                  />
                </div>
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
            Tạo đơn hàng
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default OrderForm;

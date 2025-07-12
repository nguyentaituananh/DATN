import { useState } from "react";
import {
  Button,
  Input,
  Select,
  Form,
  InputNumber,
  Card,
  DatePicker,
  App as AntdApp,
  Spin,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import debounce from "lodash.debounce";
import instanceAxios from "../../../utils/instanceAxios";

import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../api/orderAPI";


const { Option } = Select;

const OrderForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { message } = AntdApp.useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userOptions, setUserOptions] = useState<any[]>([]);
  const [userFetching, setUserFetching] = useState(false);

  // Tìm kiếm user theo mã KH
  const fetchUsers = debounce(async (query: string) => {
    if (!query) return;
    setUserFetching(true);
    try {
      const res = await instanceAxios.get(`/auth/search?q=${query}`);
      setUserOptions(res.data);
    } catch (error) {
      message.error("Không thể tìm người dùng");
    } finally {
      setUserFetching(false);
    }
  }, 500);

  const handleFinish = async (values: any) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        order_date: values.order_date?.toISOString(),
      };
      await createOrder(payload); // ✅ dùng API chuẩn
      message.success("✅ Đã thêm đơn hàng");
      onSuccess?.();
      navigate("/admin/order");
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
        {/* --- Tìm kiếm người dùng bằng customer_code --- */}
        <Form.Item label="Khách hàng" name="user_id" rules={[{ required: true }]}>
          <Select
            showSearch
            placeholder="Nhập mã khách hàng (VD: AA00001)"
            filterOption={false}
            onSearch={fetchUsers}
            notFoundContent={userFetching ? <Spin size="small" /> : null}
          >
            {userOptions.map((user) => (
              <Option key={user._id} value={user._id}>
                {user.customer_code} - {user.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* --- địa chỉ giao hàng --- */}
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
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
import React, { useState } from "react";
import { Button, Input, DatePicker, Form, message } from "antd";
import instanceAxios from "../../../utils/instanceAxios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const CreateVoucher = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      await instanceAxios.post("/api/vouchers", {
        ...values,
        expiry_date: values.expiry_date.format("YYYY-MM-DD"),
      });
      message.success("Tạo voucher thành công!");
      navigate("/admin/voucher");
    } catch (err) {
      message.error("Tạo thất bại!");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Thêm voucher mới</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Mã voucher"
          name="code"
          rules={[{ required: true, message: "Nhập mã voucher" }]}
        >
          <Input placeholder="Nhập mã giảm giá" />
        </Form.Item>

        <Form.Item
          label="Giá trị giảm (%)"
          name="discount"
          rules={[{ required: true, message: "Nhập giá trị giảm" }]}
        >
          <Input type="number" placeholder="Ví dụ: 10" />
        </Form.Item>

        <Form.Item
          label="Ngày hết hạn"
          name="expiry_date"
          rules={[{ required: true, message: "Chọn ngày hết hạn" }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tạo voucher
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateVoucher;

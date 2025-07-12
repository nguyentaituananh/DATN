import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import instanceAxios from "../../../utils/instanceAxios";

const VoucherList = () => {
  const [vouchers, setVouchers] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchVouchers = async () => {
    const res = await instanceAxios.get("/api/vouchers");
    setVouchers(res.data);
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const deleteVoucher = async (id: string) => {
    try {
      await instanceAxios.delete(`/api/vouchers/${id}`);
      message.success("Xóa voucher thành công");
      fetchVouchers();
    } catch (err) {
      message.error("Xóa thất bại");
    }
  };

  const columns = [
    { title: "Mã voucher", dataIndex: "code" },
    { title: "Giá trị (%)", dataIndex: "discount" },
    { title: "Ngày hết hạn", dataIndex: "expiry_date" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status: string) =>
        status === "active" ? (
          <Tag color="green">Còn hạn</Tag>
        ) : (
          <Tag color="red">Hết hạn</Tag>
        ),
    },
    {
      title: "Hành động",
      render: (text: any, record: any) => (
        <Popconfirm
          title="Bạn chắc chắn xoá voucher này?"
          onConfirm={() => deleteVoucher(record._id)}
        >
          <Button danger>Xoá</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Danh sách voucher</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/admin/voucher/create")}
        >
          Thêm voucher
        </Button>
      </div>
      <Table columns={columns} dataSource={vouchers} rowKey="_id" />
    </div>
  );
};

export default VoucherList;

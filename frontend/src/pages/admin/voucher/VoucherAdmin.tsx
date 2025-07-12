import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import { useNavigate } from "react-router-dom";
import instanceAxios from "../../../utils/instanceAxios";

const VoucherAdmin = () => {
  const [vouchers, setVouchers] = useState([]);
  const navigate = useNavigate();

  const fetchVouchers = async () => {
    try {
      const { data } = await instanceAxios.get("/api/vouchers");
      setVouchers(data);
    } catch (err) {
      message.error("Lỗi khi tải danh sách voucher");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await instanceAxios.delete(`/api/vouchers/${id}`);
      message.success("Xoá voucher thành công");
      fetchVouchers();
    } catch (err) {
      message.error("Xoá thất bại");
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const columns = [
    {
      title: "Mã Voucher",
      dataIndex: "code",
    },
    {
      title: "Giảm (%)",
      dataIndex: "discount",
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expiry_date",
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Thao tác",
      render: (record: any) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            onClick={() => navigate(`/admin/voucher/edit/${record._id}`)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xác nhận xoá?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger>Xoá</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Danh sách Voucher</h2>
        <Button type="primary" onClick={() => navigate("/admin/voucher/add")}>
          Thêm Voucher
        </Button>
      </div>

      <Table
        rowKey="_id"
        dataSource={vouchers}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default VoucherAdmin;

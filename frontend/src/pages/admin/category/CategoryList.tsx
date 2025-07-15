import { Table, Button, Popconfirm, message, Card } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instanceAxios from "../../../utils/instanceAxios";
import type { ColumnsType } from "antd/es/table";

interface Category {
  key: string;
  name: string;
  description: string;
  parent: string;
  createdAt?: string;
}

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  // Fetch danh sách danh mục
  const fetchCategories = async () => {
    try {
      const { data } = await instanceAxios.get("/api/categories");
      const formatted = data.map((cat: any): Category => ({
        key: cat._id,
        name: cat.name,
        description: cat.description || "Không có mô tả",
        parent: cat.parent_category_id?.name || "Danh mục chính",
        createdAt: new Date(cat.createdAt).toLocaleDateString("vi-VN"),
      }));
      setCategories(formatted);
    } catch (err) {
      message.error("Lỗi khi tải danh sách danh mục");
    }
  };

  // Xoá danh mục
  const handleDelete = async (id: string) => {
    try {
      await instanceAxios.delete(`/api/categories/${id}`);
      message.success("Xoá danh mục thành công");
      fetchCategories();
    } catch (error) {
      message.error("Xoá danh mục thất bại");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Cấu hình các cột hiển thị trong bảng
  const columns: ColumnsType<Category> = [
    { title: "Tên danh mục", dataIndex: "name", align: "center" },
    { title: "Mô tả", dataIndex: "description", align: "center" },
    { title: "Danh mục cha", dataIndex: "parent", align: "center" },
    { title: "Ngày tạo", dataIndex: "createdAt", align: "center" },
    {
      title: "Hành động",
      dataIndex: "actions",
      align: "center",
      render: (_: any, record: Category) => (
        <div className="flex gap-2 justify-center flex-wrap">
          <Button
            type="default"
            onClick={() => navigate(`/admin/category/edit/${record.key}`)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xác nhận xoá danh mục này?"
            onConfirm={() => handleDelete(record.key)}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <Button danger>Xoá</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          🗂️ Danh sách danh mục
        </h2>
        <Button type="primary" onClick={() => navigate("/admin/category/create")}>
          ➕ Thêm danh mục
        </Button>
      </div>

      <Card className="shadow-xl rounded-xl">
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={categories}
            pagination={{ pageSize: 5 }}
            bordered
            className="min-w-[800px]"
          />
        </div>
      </Card>
    </div>
  );
};

export default CategoryList;

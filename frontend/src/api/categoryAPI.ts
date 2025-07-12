// src/api/categoryAPI.ts
import axios from 'axios';

const CATEGORY_API = 'http://localhost:5000/api/categories';

// Lấy tất cả danh mục
export const getAllCategories = () => {
  return axios.get(CATEGORY_API);
};

// Lấy danh mục theo ID
export const getCategoryById = (id: string) => {
  return axios.get(`${CATEGORY_API}/${id}`);
};

// Tạo danh mục mới
export const createCategory = (data: {
  name: string;
  description?: string;
  parent_category_id?: string;
}) => {
  return axios.post(CATEGORY_API, data);
};

// Cập nhật danh mục
export const updateCategory = (
  id: string,
  data: Partial<{
    name: string;
    description: string;
    parent_category_id: string;
  }>
) => {
  return axios.put(`${CATEGORY_API}/${id}`, data);
};

// Xoá danh mục
export const deleteCategory = (id: string) => {
  return axios.delete(`${CATEGORY_API}/${id}`);
};

import axios from "axios";
import { Product } from "../types";

const API_URL = "http://localhost:5000/api/products";

// Lấy tất cả sản phẩm
export const fetchAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Lấy chi tiết sản phẩm theo ID
export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Tìm kiếm sản phẩm theo tên
export const searchProducts = async (query: string): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/search?q=${query}`);
  return response.data;
};

// Lấy sản phẩm theo tên danh mục
export const fetchProductsByCategory = async (categoryName: string): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/category/${categoryName}`);
  return response.data;
};

// Tạo sản phẩm mới (có kèm ảnh - FormData)
export const createProduct = async (formData: FormData): Promise<Product> => {
  const response = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Cập nhật sản phẩm (có thể kèm ảnh mới)
export const updateProduct = async (id: string, formData: FormData): Promise<Product> => {
  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Xoá sản phẩm
export const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

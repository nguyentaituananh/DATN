import axios from "axios";
import { ProductVariant } from "../types"; 

const API_URL = "http://localhost:5000/api/product-variants";

// Lấy tất cả biến thể sản phẩm
export const fetchAllVariants = async (): Promise<ProductVariant[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Lấy chi tiết biến thể theo ID
export const fetchVariantById = async (id: string): Promise<ProductVariant> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Tạo biến thể mới
export const createVariant = async (data: FormData | ProductVariant): Promise<ProductVariant> => {
  const config =
    data instanceof FormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : {};

  const response = await axios.post(API_URL, data, config);
  return response.data;
};

// Cập nhật biến thể
export const updateVariant = async (
  id: string,
  data: FormData | ProductVariant
): Promise<ProductVariant> => {
  const config =
    data instanceof FormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : {};

  const response = await axios.put(`${API_URL}/${id}`, data, config);
  return response.data;
};

// Xoá biến thể
export const deleteVariant = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};


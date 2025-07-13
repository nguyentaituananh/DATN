import axios from "axios";
import { Product } from "../types";

const API_URL = "http://localhost:5000/api/products";

// ✅ Không cần FetchProductsResponse nữa vì trả về mảng trực tiếp
export const fetchAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get(API_URL);

  console.log("API raw response:", response.data); // ✅ sẽ là Product[]

  return response.data; // ⬅ chính là mảng Product[]
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

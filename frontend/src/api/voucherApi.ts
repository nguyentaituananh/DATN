import axios from "axios";

const API_URL = "http://localhost:5000/api/vouchers";

export const getAllVouchers = () => axios.get(API_URL);
export const createVoucher = (data: any) => axios.post(API_URL, data);
export const updateVoucher = (id: string, data: any) =>
  axios.put(`${API_URL}/${id}`, data);
export const deleteVoucher = (id: string) => axios.delete(`${API_URL}/${id}`);

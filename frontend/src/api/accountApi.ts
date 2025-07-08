import axios from "axios";
const API_URL = "http://localhost:5000/users";

export const getAccount = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// export const updateAccount = async (id: string, data: any) => {
//   const res = await axios.put(`${API_URL}/${id}`, data);
//   return res.data;
// };

export const deleteAccount = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};


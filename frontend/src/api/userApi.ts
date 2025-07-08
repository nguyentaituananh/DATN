import axios from "axios";
import { User } from "../types";

const API_URL = "http://localhost:5000/auth/user";

export const getUsers = () => axios.get(API_URL);

export const deleteUser = (id: string) => axios.delete(`${API_URL}/${id}`);

export const updateUser = (id: string, data: Partial<User>) =>
  axios.put<User>(`${API_URL}/${id}`, data);

import axios from "axios";
import { User } from "../types";

const API_URL = "http://localhost:5000/users";

export const getUsers = () => axios.get<User[]>(API_URL);

export const deleteUser = (id: string) => axios.delete(`${API_URL}/${id}`);

export const updateUser = (id: string, data: Partial<User>) =>
  axios.put<User>(`${API_URL}/${id}`, data);

export const createUser = (data: Omit<User, "id" | "createdAt">) =>
  axios.post<User>(API_URL, {
    ...data,
    createdAt: new Date().toISOString(),
  });



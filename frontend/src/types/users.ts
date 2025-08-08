export interface IUser {
  _id: string;
  name: string;
  customer_code: string;
  email: string;
  phone_number?: string;
  is_active: boolean;
  verify: boolean;
  role: 'admin' | 'customer';
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

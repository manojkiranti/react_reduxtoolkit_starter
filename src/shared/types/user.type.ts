import { string } from "yup";

export type Designation = {
  id: number;
  name: string;
}
export type AuthUser = {
  email: string;
  phone: string | null;
  name?: string | null;
  isAdmin?: boolean;
  is2FAEnabled?: boolean;
  userId?: string;
  designation: Designation | null;
};

export type UserMini = {
    id: number;
    name: string | null;
    email: string;
    phone: string | null;
}

export type User = UserMini & {
  designation: Designation | null;
}
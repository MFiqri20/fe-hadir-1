import { BaseResponseSucess } from "@/lib/axiosClient";

export interface User {
  id?: number;
  role: "admin" | "guru" | "kepala sekolah" | "siswa" | "wali kelas";
  nama: string;
  avatar: string;
  NIK: string;
  email: string;
  password: string;
  access_token: string;
  refresh_token: string;
  created_at: string;
  updated_at: string;
}

export interface LoginPayload extends Pick<User, "email" | "password"> {}
export interface LoginResponse extends BaseResponseSucess {
  data: User;
}

export interface ProfileResponse extends BaseResponseSucess {
  data: User;
}

export interface LupaPasswordPayload extends Pick<User, "email"> {}
export interface ResetPasswordPayload {
  new_password: string;

  confirm_password: string;
}

export interface ResetPasswordRespone extends BaseResponseSucess {
  data: User;
}

import { ApiResponse } from "../types";
import { AxiosClient } from "../utils/clients";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface StudentLoginResponse {
  user: StudentLoginData;
}

export interface StudentLoginData {
  id: string;
  index_no: number;
  firstname: string;
  othername: string;
  lastname: string;
  current_class: string;
  username: string;
  school_id: string;
  token: string;
  school_logo_url: string;
  school_motto: string;
  school_name: string;
  school_address: string;
}

export default class AuthRepository {
  BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  constructor(private client: AxiosClient) {}
  async login(payload: LoginPayload) {
    const res = await this.client.post<ApiResponse<StudentLoginResponse>>(
      `/api/login`,
      payload
    );
    return res.data;
  }
}

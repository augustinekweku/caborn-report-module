import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { COOKIE_KEY, USER_TYPE_KEY } from "../../constants";

import { RootState } from "../../store";
import { setCookie, deleteCookie, getCookie } from "cookies-next";

import { AuthActions } from "@/store/auth-reducer";
import {
  LoginPayload,
  StudentLoginResponse,
} from "@/respositories/auth-repository";
import { ApiResponse } from "@/types";

export default class AuthService {
  constructor(
    private store: ToolkitStore<RootState>,
    private authActions: AuthActions
  ) {}

  async login(
    payload: LoginPayload
  ): Promise<ApiResponse<StudentLoginResponse>> {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data: ApiResponse<StudentLoginResponse> = await res.json();
      if (data.code.toString() === "200" || data.code.toString() === "201") {
        this.store.dispatch(
          this.authActions.saveStudentUserProfile({
            ...data.data,
          })
        );
        if (data.data.user.token) {
          setCookie(COOKIE_KEY, data.data.user.token, {
            maxAge: 7200,
            path: "/",
          });
        }
      }
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  logoutUser() {
    deleteCookie(COOKIE_KEY);
  }

  isAuthTokenValid(accessToken: string) {
    // TODO: make an API call to validate cookie
    if (accessToken.length > 40) {
      // this.authRepository.verifyToken(accessToken)
      return true;
    }

    return false;
  }

  haveUserToken() {
    return !!getCookie(COOKIE_KEY);
  }
}

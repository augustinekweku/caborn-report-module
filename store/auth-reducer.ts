import { StudentLoginResponse } from "@/respositories/auth-repository";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  todo: {};
  studentUserProfile: StudentLoginResponse;
}

export interface UpdateSchoolInfoResponse {
  id: string;
  name: string;
  slug: string;
  country: string;
  owner: string;
  school_email: string;
  motto: string;
  address: string;
  logo_url: string;
  created_at: string;
  updated_at: string;
}

const initialState: AuthState = {
  todo: {},

  studentUserProfile: {} as StudentLoginResponse,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveTodo: (state, action: PayloadAction<{}>) => {
      state.todo = action.payload;
    },

    saveStudentUserProfile: (
      state,
      action: PayloadAction<StudentLoginResponse>
    ) => {
      state.studentUserProfile = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export type AuthActions = typeof authSlice.actions;
export default authSlice.reducer;

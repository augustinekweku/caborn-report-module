import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface GenericConfirmModalState {
  status: boolean;
  title?: string;
  type?: "success" | "info" | "warning" | "error" | undefined;
  message?: string;
  isConfirmed?: boolean;
}

const initialState: GenericConfirmModalState = {
  status: false,
  title: "",
  type: "info",
  message: "",
  isConfirmed: false,
};

export const genericConfirmModalSlice = createSlice({
  name: "genericConfirmModal",
  initialState,
  reducers: {
    callGenericConfirmModal: (
      state,
      action: PayloadAction<GenericConfirmModalState>
    ) => {
      state.status = true;
      state.message = action.payload?.message;
      state.isConfirmed = false;
    },
    confirmGenericConfirmModal: (
      state,
      action: PayloadAction<GenericConfirmModalState>
    ) => {
      state.isConfirmed = true;
      state.status = false;
      state.title = "";
    },
    closeGenericConfirmModal: (state) => {
      state.status = false;
      state.isConfirmed = false;
    },
  },
});

export const genericConfirmModalActions = genericConfirmModalSlice.actions;
export type genericConfirmModalActions =
  typeof genericConfirmModalSlice.actions;
export default genericConfirmModalSlice.reducer;

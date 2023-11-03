import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface GenericDialogState {
  status: boolean;
  title?: string;
  type?: "success" | "info" | "warning" | "error" | undefined;
  message?: string;
}

const initialState: GenericDialogState = {
  status: false,
  title: "",
  type: "info",
  message: "",
};

export const genericDialogSlice = createSlice({
  name: "genericDialog",
  initialState,
  reducers: {
    setGenericDialog: (state, action: PayloadAction<GenericDialogState>) => {
      state.status = action.payload?.status;
      state.title = action.payload?.title;
      state.message = action.payload?.message;
      state.type = action.payload?.type;
    },
  },
});

export const genericDialogActions = genericDialogSlice.actions;
export type genericDialogActions = typeof genericDialogSlice.actions;
export default genericDialogSlice.reducer;

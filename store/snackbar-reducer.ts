import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SnackbarState {
  status: boolean;
  severity?: "success" | "info" | "warning" | "error" | undefined;
  message?: string;
  anchorOrigin: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
}

const initialState: SnackbarState = {
  status: false,
  severity: "info",
  message: "",
  anchorOrigin: {
    vertical: "top",
    horizontal: "right",
  },
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbar: (state, action: PayloadAction<SnackbarState>) => {
      state.status = action.payload?.status;
      state.message = action.payload?.message;
      state.severity = action.payload?.severity;
      state.anchorOrigin = action.payload?.anchorOrigin;
    },
  },
});

export const snackbarActions = snackbarSlice.actions;
export type snackbarActions = typeof snackbarSlice.actions;
export default snackbarSlice.reducer;

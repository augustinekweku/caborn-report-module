import { Report } from "@/respositories/report-repository";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ReportModuleState {
  report: Report;
}

const initialState: ReportModuleState = {
  report: {} as Report,
};

export const ReportModuleSlice = createSlice({
  name: "reportModule",
  initialState,
  reducers: {
    setReport: (state, action: PayloadAction<Report>) => {
      state.report = action.payload;
    },
  },
});

export const reportModuleActions = ReportModuleSlice.actions;
export type reportModuleActions = typeof ReportModuleSlice.actions;
export default ReportModuleSlice.reducer;

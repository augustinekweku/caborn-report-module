import ReportRepository, { Report } from "@/respositories/report-repository";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

import { reportModuleActions } from "../store/report-module-reducer";
import { RootState } from "@/store";

export default class ReportService {
  constructor(
    private reportRepository: ReportRepository,
    private store: ToolkitStore<RootState>,
    private authActions: reportModuleActions
  ) {}

  async createReport(payload: Partial<Report>) {
    return await this.reportRepository.createReport(payload);
  }
  async getReports(companies: string) {
    return this.reportRepository.getReports(companies);
  }
  async getReport(reportId: string) {
    const res = await this.reportRepository.getReport(reportId);
    this.store.dispatch(this.authActions.setReport(res.data));
    return res;
  }
  async deleteReport(reportId?: string) {
    return this.reportRepository.deleteReport(reportId);
  }
  async updateReport(reportId: string, payload: Partial<Report>) {
    return this.reportRepository.updateReport(reportId, payload);
  }
}

import { ApiPaginatedResponse, ApiResponse } from "@/types/global";
import { AxiosClient } from "../utils/clients";

export interface EntitySummary {
  id: string;
  name: string;
  carbonId: string;
  createdAt: string;
  updatedAt: string;
}

export type Report = {
  id: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  colorPalette: object;
  baseFontName: string;
  subheadingFontName: string;
  headingFontName: string;
  baseFontSize: number;
  subheadingFontSize: number;
  headingFontSize: number;
  entities: string[];
  name: string;
  reportingCycleStart: string;
  reportingCycleEnd: string;
  isTemplate: boolean;
  content: string;
  baseReport: string;
  language: string;
  headingColor: string;
  basetextcolor: string;
  subheadingsColor: string;
};

export default class ReportRepository {
  constructor(private client: AxiosClient) {}
  private BASE_URL = "https://api-testing.carbontool.com/api";

  async createReport(payload: Partial<Report>) {
    const res = await this.client.post<ApiResponse<Report>>(
      `${this.BASE_URL}/reports/`,
      payload
    );
    return res.data;
  }

  async getReports(companyId: string) {
    const res = await this.client.get<ApiPaginatedResponse<Report>>(
      `${this.BASE_URL}/reports/companies/${companyId}/`
    );
    return res.data;
  }

  async getReport(reportId: string) {
    const res = await this.client.get<ApiResponse<Report>>(
      `${this.BASE_URL}/reports/${reportId}`
    );
    return res.data;
  }

  async deleteReport(reportId?: string) {
    const res = await this.client.delete<any>(
      `${this.BASE_URL}/reports/${reportId}/`
    );
    return res.data;
  }

  async updateReport(reportId: string, payload: Partial<Report>) {
    const res = await this.client.patch<ApiResponse<Report>>(
      `${this.BASE_URL}/reports/${reportId}/`,
      payload
    );
    return res.data;
  }
}

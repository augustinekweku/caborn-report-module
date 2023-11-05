import { ApiPaginatedResponse } from "@/types/global";
import { ApiResponse } from "../types";
import { AxiosClient } from "../utils/clients";
import { EntityEmissionsSummary } from "../types";

export type EmissionSummaryParams = {
  start_date: string;
  end_date: string;
};
export default class EntityRepository {
  constructor(private client: AxiosClient) {}
  private BASE_URL = "https://api-testing.carbontool.com/api";

  async getEmissionSummary(entityId: string, params?: EmissionSummaryParams) {
    const res = await this.client.get<ApiResponse<EntityEmissionsSummary>>(
      `${this.BASE_URL}/emission-data/${entityId}/emissions/`,
      {
        params,
      }
    );
    return res.data;
  }
}

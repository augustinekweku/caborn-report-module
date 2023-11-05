import EntityRepository, {
  EmissionSummaryParams,
} from "@/respositories/entity-repository";
import { Entity } from "../types";

export default class EntityService {
  constructor(private EntityRepository: EntityRepository) {}

  async getEmissionSummary(entityID: string, params: EmissionSummaryParams) {
    const res = await this.EntityRepository.getEmissionSummary(
      entityID,
      params
    );
    return res;
  }
}

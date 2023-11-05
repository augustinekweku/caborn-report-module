import axios from "axios";
import { AxiosClient } from "./utils/clients";

import { store } from "./store";
import { reportModuleActions } from "./store/report-module-reducer";
import ReportRepository from "./respositories/report-repository";
import ReportService from "./services/report-service";
import EntityRepository from "./respositories/entity-repository";
import EntityService from "./services/entity-service";

export const serverSideClient = new AxiosClient(axios, {
  headers: {
    "Content-Type": "application/json",
  },
});

// client
const client = new AxiosClient(axios);

// repositories
const reportRepository = new ReportRepository(client);
const entityRepository = new EntityRepository(client);

// services
const reportService = new ReportService(
  reportRepository,
  store,
  reportModuleActions
);
const entityService = new EntityService(entityRepository);

const DI = {
  reportService,
  entityService,
};

export default DI;

import axios from "axios";
import { AxiosClient } from "./utils/clients";

import { store } from "./store";
import { authActions } from "./store/auth-reducer";
import AuthService from "./services/apis/auth-service";
import DashboardService from "./services/apis/dashboard-service";

export const serverSideClient = new AxiosClient(axios, {
  headers: {
    "Content-Type": "application/json",
  },
});

// services
const authService = new AuthService(store, authActions);

const DI = {
  authService,
};

export default DI;

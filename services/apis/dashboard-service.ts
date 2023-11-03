import { cookies } from "next/headers";
import { fetchData } from "../factory";
import { GetDashboardDataResponse } from "@/respositories/dashboard-repository";
import { decryptToken } from "@/utils";
import { ApiResponse } from "@/types";
const DashboardService = (() => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const cookieStore = cookies();
  const token = cookieStore.get("smsStudentToken");
  const decryptedToken = decryptToken(token?.value as string);

  const getDashboardData = async () => {
    const responseData = await fetchData<ApiResponse<GetDashboardDataResponse>>(
      {
        endpoint: `${BASE_URL}/students/portal`,
        method: "GET",
        header: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      }
    );

    return responseData;
  };

  return {
    getDashboardData,
  };
})();

export default DashboardService;

import { fetchData } from "../factory";
import { GetDashboardDataResponse } from "@/respositories/dashboard-repository";
import { decryptToken } from "@/utils";
import { ApiResponse } from "@/types";
import { UpdateAccountPayload } from "@/respositories/account-repository";
import { getCookie } from "cookies-next";
import { COOKIE_KEY } from "@/constants";
const AccountService = (() => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const token = getCookie(COOKIE_KEY);

  const decryptedToken = decryptToken(token as string);

  const updateAccount = async (payload: UpdateAccountPayload) => {
    try {
      const responseData = await fetchData<
        ApiResponse<GetDashboardDataResponse>
      >({
        endpoint: `${BASE_URL}/students/portal/account-settings`,
        method: "PATCH",
        header: {
          Authorization: `Bearer ${decryptedToken}`,
        },
        payload,
      });
      return responseData;
    } catch (error) {
      throw error;
    }
  };

  return {
    updateAccount,
  };
})();

export default AccountService;

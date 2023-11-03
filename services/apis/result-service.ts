import { fetchData } from "../factory";
import { decryptToken } from "@/utils";
import { ApiResponse } from "@/types";
import { getCookie } from "cookies-next";
import { GetResultsResponse } from "@/respositories/result-repository";
const ResultService = (() => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const token = getCookie("smsStudentToken");

  const decryptedToken = decryptToken(token as string);

  const getResults = async (param: { class_id: string; term_id: string }) => {
    try {
      const responseData = await fetchData<ApiResponse<GetResultsResponse>>({
        endpoint: `${BASE_URL}/students/portal/result-list?class_id=${param.class_id}&term_id=${param.term_id}`,
        method: "GET",
        header: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      });
      return responseData;
    } catch (error) {
      throw error;
    }
  };

  return {
    getResults,
  };
})();

export default ResultService;

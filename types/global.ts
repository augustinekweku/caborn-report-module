export enum ApiResponseStatus {
  SUCCESS = "success",
  FAILED = "failed",
}
export interface ApiResponse<T> {
  data: T;
  status: ApiResponseStatus;
}

export type ApiDataError = {
  data: Record<string, string> & { code: string; detail: string };
  status: ApiResponseStatus.FAILED;
};

export interface ListAPIResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

export interface ApiPaginatedResponse<T> {
  data: ListAPIResponse<T>;
}

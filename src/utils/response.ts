import { ApiResponse } from "../../app/types/apiResponses";

export function buildSuccessResponse<T>(
  message: string,
  data: T
): ApiResponse<T> {
  return {
    message,
    result: data,
  };
}

export function buildErrorResponse(message: string): ApiResponse<null> {
  return {
    message,
    result: null,
  };
}

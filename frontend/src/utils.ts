import { APIError } from "./types/APIErrors";

export const getError = (error: unknown): string => {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as APIError).response?.data?.message === "string"
  ) {
    return (error as APIError).response.data.message;
  }

  return (error as Error)?.message || "An unknown error occurred";
};

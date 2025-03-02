import { APIError } from "./types/APIErrors";

export const getError = (error: APIError) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

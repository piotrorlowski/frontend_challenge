import axios from "axios";

/**
 * Function for detecting url change.
 */
export const areUrlsDifferent = (prevUrl: string, nextUrl: string) =>
  prevUrl !== nextUrl;

/**
 * Function for getting data from API.
 */
export const getData = async <T extends Record<string, unknown>>(
  url: string
) => {
  const response = await axios.get<{ results: ReadonlyArray<T> }>(url);
  return response.data.results;
};

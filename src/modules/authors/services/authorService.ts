import { fetcher } from "@/shared/services/http";
import { Author } from "../types/author";

export const fetchStudentServices = (): Promise<Author[]> => {
  // We call the GET /services endpoint.
  // The fetcher takes care of the base URL and error handling.
  return fetcher<Author[]>("/authors");
};
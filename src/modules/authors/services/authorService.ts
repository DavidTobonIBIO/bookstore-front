import { fetcher } from "@/shared/services/http";
import { Author } from "../types/author";
import { AuthorFormData } from "../validation/authorSchema";

export const fetchAuthorsService = (): Promise<Author[]> => {
  // We call the GET /authors endpoint.
  // The fetcher takes care of the base URL and error handling.
  return fetcher<Author[]>("/authors");
};

/**
 * Create a new author by sending the form data to the API.
 * @param data - The form data to create a new author validated by Zod.
 * @returns A promise that resolves with the newly created author from the backend.
 */
export const createAuthor = (data: AuthorFormData): Promise<Author> => {
  return fetcher<Author>("/authors", {
    method: "POST",
    body: JSON.stringify(data), // We send the data as a JSON string
  });
};
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

/**
 * Update an existing author by sending the form data to the API.
 * @param id - The ID of the author to update.
 * @param data - The form data to update the author validated by Zod.
 * @returns A promise that resolves with the updated author from the backend.
 */
export const updateAuthor = (id: string, data: AuthorFormData): Promise<Author> => {
  return fetcher<Author>(`/authors/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

/**
 * Delete an author by ID.
 * @param id - The ID of the author to delete.
 * @returns A promise that resolves when the author is successfully deleted.
 */
export const deleteAuthor = (id: string): Promise<void> => {
  return fetcher<void>(`/authors/${id}`, {
    method: "DELETE",
  });
};

/**
 * Fetch a single author by ID.
 * @param id - The ID of the author to fetch.
 * @returns A promise that resolves with the author data.
 */
export const fetchAuthorById = (id: string): Promise<Author> => {
  return fetcher<Author>(`/authors/${id}`);
};
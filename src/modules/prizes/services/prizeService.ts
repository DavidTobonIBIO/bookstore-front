import { fetcher } from "@/shared/services/http";
import { Prize } from "../types/prize";
import { PrizeFormData } from "../validation/prizeSchema";
import { Author } from "@/modules/authors/types/author";

/**
 * Create a new prize by sending the form data to the API.
 * @param data - The form data to create a new prize validated by Zod.
 * @returns A promise that resolves with the newly created prize from the backend.
 */
export const createPrize = (data: PrizeFormData): Promise<Prize> => {
  return fetcher<Prize>("/prizes", {
    method: "POST",
    body: JSON.stringify(data), // We send the data as a JSON string
  });
};

/**
 * Associate a prize to an author by ID.
 * @param prizeId - The ID of the prize won by the author.
 * @param authorId - The ID of the author winner of the prize.
 * @returns A promise that resolves with the book data.
 */
export const addBookToAuthor = (prizeId: string, authorId: string): Promise<Author> => {
  return fetcher<Author>(`/prizes/${prizeId}/authors/${authorId}`, {
    method: "POST",
  });
}
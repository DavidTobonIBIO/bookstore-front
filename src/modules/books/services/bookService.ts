import { fetcher } from "@/shared/services/http";
import { Book } from "../types/book";
import { ReviewFormData } from "../validation/reviewSchema";
import { Review } from "../types/review";
import { BookFormData } from "../validation/bookSchema";

export const fetchBooksService = (): Promise<Book[]> => {
  // We call the GET /books endpoint.
  // The fetcher takes care of the base URL and error handling.
  return fetcher<Book[]>("/books");
};

/**
 * Create a new author by sending the form data to the API.
 * @param data - The form data to create a new book validated by Zod.
 * @returns A promise that resolves with the newly created book from the backend.
 */
export const createBook = (data: BookFormData): Promise<Book> => {
  return fetcher<Book>("/books", {
    method: "POST",
    body: JSON.stringify(data), // We send the data as a JSON string
  });
};

/**
 * Add a book review.
 * @param data - The review data.
 * @returns A promise that resolves when the review is successfully created.
 */
export const addReview = (data: ReviewFormData): Promise<Review> => {
  return fetcher<Review>("/books", {
    method: "POST",
    body: JSON.stringify(data), // We send the data as a JSON string
  });
};

/**
 * Fetch a single author by ID.
 * @param id - The ID of the author to fetch.
 * @returns A promise that resolves with the author data.
 */
export const fetchBookById = (id: string): Promise<Book> => {
  return fetcher<Book>(`/books/${id}`);
};
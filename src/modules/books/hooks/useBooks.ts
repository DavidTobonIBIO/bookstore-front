import { useBookStore } from "@/modules/books/store/booksStore";
import { useCallback, useState } from "react";
import { 
    fetchBooksService, 
    createBook as createBookService, 
    fetchBookById
} from "../services/bookService";
import { BookFormData } from "../validation/bookSchema";
import { Book } from "../types/book";

export const useBooks = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { books, setBooks, addBook } = useBookStore();

    const fetchBooks = useCallback(async () => {
        try {
            setError(null);
            setLoading(true);
            const apiResponse = await fetchBooksService();
            setBooks(apiResponse);
        } catch (err) {
            setError('Error fetching books');
            console.error('Error fetching books', err);
        } finally {
            setLoading(false);
        }
    }, [setBooks]);

    const createBook = useCallback(async (data: BookFormData): Promise<Book> => {
        try {
            setError(null);
            setLoading(true);
            const newBook = await createBookService(data);
            addBook(newBook);
            return newBook;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error creating book';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [addBook]);

    const getBookById = useCallback(async (id: string): Promise<Book | null> => {
        try {
            setError(null);
            setLoading(true);
            const book = await fetchBookById(id);
            return book;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error fetching book';
            setError(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        books,
        loading,
        error,
        fetchBooks,
        createBook,
        getBookById
    };
};
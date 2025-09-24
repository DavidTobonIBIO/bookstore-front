import { Book } from "@/modules/books/types/book";
import { create } from "zustand";

interface BooksState {
    books: Book[];
    setBooks: (authors: Book[]) => void;
    addBook: (author: Book) => void;
}

export const useBookStore = create<BooksState>((set) => ({
    books: [],

    setBooks: (books) => set({ books }),

    addBook: (book) => set((state) => ({
        books: [...state.books, book] // todos los autores actuales + el autor nuevo
    })),
    
}));
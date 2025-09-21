import { Author } from "@/modules/authors/types/author";
import { create } from "zustand";

interface AuthorsState {
    authors: Author[];

    setAuthors: (authors: Author[]) => void;
    addAuthor: (author: Author) => void;
    updateAuthor: (id: string, updatedAuthor: Partial<Author>) => void;
    deleteAuthor: (id: string) => void;
}

export const useAuthorStore = create<AuthorsState>((set) => ({
    authors: [],

    setAuthors: (authors) => set({ authors }),

    addAuthor: (author) => set((state) => ({
        authors: [...state.authors, author] // todos los autores actuales + el autor nuevo
    })),
    
    updateAuthor: (id, updatedAuthor) => {
        set((state) => {
            const newAuthors = [...state.authors];
            const authorIndex = newAuthors.findIndex(author => author.id === id);

            if (authorIndex !== -1) {
                // sobreescribir con los nuevos valores de los atributos si se encontró el autor
                newAuthors[authorIndex] = {
                ...newAuthors[authorIndex],
                ...updatedAuthor
                };
            }

            // retornar el nuevo estado
            return { authors: newAuthors };
        });
    },

    deleteAuthor: (id) => set((state) => ({
        authors: state.authors.filter(author => author.id !== id)
    })),
}));
import { useAuthorStore } from "@/modules/authors/store/authorsStore";
import { useCallback, useState } from "react";
import { 
    fetchAuthorsService, 
    createAuthor as createAuthorService, 
    updateAuthor as updateAuthorService, 
    deleteAuthor as deleteAuthorService,
    fetchAuthorById
} from "../services/authorService";
import { AuthorFormData } from "../validation/authorSchema";
import { Author } from "../types/author";

export const useAuthors = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { authors, setAuthors, addAuthor, updateAuthor: updateAuthorInStore, deleteAuthor: deleteAuthorFromStore } = useAuthorStore();

    const fetchAuthors = useCallback(async () => {
        try {
            setError(null);
            setLoading(true);
            const apiResponse = await fetchAuthorsService();
            setAuthors(apiResponse);
        } catch (err) {
            setError('Error fetching authors');
            console.error('Error fetching authors', err);
        } finally {
            setLoading(false);
        }
    }, [setAuthors]);

    const createAuthor = useCallback(async (data: AuthorFormData): Promise<Author> => {
        try {
            setError(null);
            setLoading(true);
            const newAuthor = await createAuthorService(data);
            addAuthor(newAuthor);
            return newAuthor;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error creating author';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [addAuthor]);

    const updateAuthor = useCallback(async (id: string, data: AuthorFormData): Promise<Author> => {
        try {
            setError(null);
            setLoading(true);
            const updatedAuthor = await updateAuthorService(id, data);
            updateAuthorInStore(id, updatedAuthor);
            return updatedAuthor;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error updating author';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [updateAuthorInStore]);

    const deleteAuthor = useCallback(async (id: string): Promise<void> => {
        try {
            setError(null);
            setLoading(true);
            await deleteAuthorService(id);
            deleteAuthorFromStore(id);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error deleting author';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [deleteAuthorFromStore]);

    const getAuthorById = useCallback(async (id: string): Promise<Author | null> => {
        try {
            setError(null);
            setLoading(true);
            const author = await fetchAuthorById(id);
            return author;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error fetching author';
            setError(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        authors,
        loading,
        error,
        fetchAuthors,
        createAuthor,
        updateAuthor,
        deleteAuthor,
        getAuthorById
    };
};
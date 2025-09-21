import { useAuthorStore } from "@/modules/authors/store/authorsStore";
import axios from "axios";
import { useCallback, useState } from "react";

export const useAuthors = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { authors, setAuthors, addAuthor, updateAuthor, deleteAuthor } = useAuthorStore();

    const API_URL = 'http://127.0.0.1:8080/api/authors';

    const fetchAuthors = useCallback(async () => {
        try {
            setError(null);
            setLoading(true)
            const apiResponse = await axios.get(API_URL);
            setAuthors(apiResponse.data);
        } catch (err) {
            setError('Error fetching authors');
            console.error('Error fetching authors', err)
        } finally {
            setLoading(false);
        }
    }, [setAuthors]);

    return {
        authors,
        loading,
        error,
        fetchAuthors,
        addAuthor,
        updateAuthor,
        deleteAuthor
    };
};
import { useAuthorStore } from "@/store/authorsStore";
import axios from "axios";
import { useState } from "react";

export const useAuthors = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { authors, setAuthors, addAuthor, updateAuthor, deleteAuthor } = useAuthorStore();

    const API_URL = 'http://127.0.0.1:8080/api/authors';

    const fetchAuthors = async () => {
        try {
            setLoading(true);
            setError(null);

            const apiResponse = await axios.get(API_URL);
            setAuthors(apiResponse.data);
        } catch (err) {
            setError('Error fetching authors');
            console.error('Error fetching authors', err)
        } finally {
            setLoading(false);
        }
    };

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
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthorFormData } from "../validation/authorSchema";
import AuthorForm from "../ui/AuthorForm";
import { useAuthors } from "../hooks/useAuthors";
import { useNotificationStore } from "@/shared/store/useNotificationStore";

interface AuthorEditPageProps {
  authorId: string;
}

export default function AuthorEditPage({ authorId }: AuthorEditPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<AuthorFormData | null>(null);
  const router = useRouter();
  
  const { updateAuthor, getAuthorById, loading } = useAuthors();
  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const author = await getAuthorById(authorId);
        if (author) {
          setInitialData({
            name: author.name,
            description: author.description,
            birthDate: author.birthDate,
            image: author.image,
          });
        } else {
          setError("Author not found");
        }
      } catch (err) {
        setError("Error loading author data");
      }
    };

    fetchAuthor();
  }, [authorId, getAuthorById]);

  const handleUpdateAuthor = async (data: AuthorFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await updateAuthor(authorId, data);
      showNotification("Author updated successfully", "success");
      router.push("/authors");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred while updating the author";
      setError(errorMessage);
      showNotification(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !initialData) {
    return <div className="container mx-auto p-8">Loading author data...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Author</h1>
      <AuthorForm 
        onSubmit={handleUpdateAuthor} 
        defaultValues={initialData}
        isSubmitting={isSubmitting} 
      />
    </div>
  );
}

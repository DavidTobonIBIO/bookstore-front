"use client";

import { useState } from "react";
import { AuthorFormData } from "../validation/authorSchema";
import AuthorForm from "../ui/AuthorForm";
import { useRouter } from "next/navigation";
import { createAuthor } from "../services/authorService";
import { useNotificationStore } from "@/shared/store/useNotificationStore";

export default function AuthorCreate() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Get the router to redirect

  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );
  
  const handleCreateAuthor = async (data: AuthorFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await createAuthor(data);
      showNotification("Author created successfully", "success");
      router.push("/authors");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error ocurred while creating the author";
      setError(errorMessage);
      showNotification(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Create New Author</h1>
      <AuthorForm onSubmit={handleCreateAuthor} isSubmitting={isSubmitting} />
    </div>
  );
}
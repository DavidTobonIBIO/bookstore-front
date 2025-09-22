"use client";

import { useState } from "react";
import { AuthorFormData } from "../validation/authorSchema";
import AuthorForm from "../ui/AuthorForm";
import { useRouter } from "next/navigation";
import { createAuthor } from "../services/authorService";

export default function AuthorCreatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Get the router to redirect

  const handleCreateAuthor = async (data: AuthorFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await createAuthor(data);
      router.push("/authors");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while creating the author."
      );
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
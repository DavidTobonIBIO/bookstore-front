"use client";

import AuthorCard from "@/modules/authors/ui/AuthorCard";
import { useAuthors } from "@/modules/authors/hooks/useAuthors";
import Link from "next/link";
import { useEffect } from "react";

export default function AuthorsListPage() {
  const { authors, loading, error, fetchAuthors } = useAuthors();

  useEffect(() => {
    fetchAuthors();
  }, []);

  if (loading) {
    return <div className="p-4">Loading authors...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold">Authors List</h1>
            <Link
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                href="/authors/create"
            >
                Add Author
            </Link>
            </div>

            {authors.length === 0 ? (
            <p>There are no authors.</p>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {authors.map((author) => (
                <AuthorCard key={author.id} author={author}/>
                ))}
            </div>
            )}
        </div>
    );
}

"use client";

import { useBooks } from "@/modules/books/hooks/useBooks";
import BookCard from "@/modules/books/ui/BookCard";
import { useEffect } from "react";

export default function BooksListPage() {
  const { books, loading, error, fetchBooks } = useBooks();

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return <div className="p-4">Loading books...</div>;
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
            <h1 className="text-4xl font-bold">Books List</h1>
            </div>

            {books.length === 0 ? (
            <p>There are no books.</p>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {books.map((book) => (
                <BookCard key={book.id} book={book}/>
                ))}
            </div>
            )}
        </div>
    );
}

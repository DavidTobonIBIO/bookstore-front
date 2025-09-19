"use client";

import { useAuthors } from "@/hooks/useAuthors";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Authors() {
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
      <h1 className="text-4xl font-bold">Authors List</h1>
      <Link
        className="px-3 font-bold hover:text-gray-300"
        href="/authors/create"
      >
        Create a new Author
      </Link>

      {authors.length === 0 ? (
        <p>There are no authors.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <div key={author.id} className="border rounded-lg p-4">
              <Image
                width={500}
                height={500}
                src={author.image}
                alt={author.name}
                className="w-full h-100 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-bold">{author.name}</h2>
              <p className="text font-bold">Born: {author.birthDate}</p>
              <p className="text font-bold">{author.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

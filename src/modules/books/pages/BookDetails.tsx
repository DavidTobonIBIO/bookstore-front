"use client";

import { useEffect, useState } from "react";
import { useBooks } from "../hooks/useBooks";
import { Book } from "../types/book";
import Image from "next/image";
import Link from "next/link";


interface BookDetailsProps {
    bookId: string;
}


export default function BookDetails({ bookId }: BookDetailsProps) {

    const [book, setBook] = useState<Book | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { getBookById, loading } = useBooks();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const book = await getBookById(bookId);
                if (book) {
                    setBook(book);
                } else {
                    setError("Book not found");
                }
            } catch (err) {
                setError("Error loading book data");
            }
        };

        fetchBook();
    }, [bookId, getBookById]);
    
    if (loading || !book) {
      return <div className="container mx-auto p-8">Loading book data...</div>;
    }

    if (error) {
      return (
        <div className="container mx-auto p-8">
          <div className="text-red-500">{error}</div>
        </div>
      );
    }

    return (
        <div className="border rounded-lg shadow-lg overflow-hidden max-w-sm">
            <Image
                src={book.image}
                alt={`Photo of ${book.name}`}
                width={500}
                height={500}
                className="w-full h-80 object-cover"
            />
            <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{book.name}</h3>
                <p className="text-white-700 mb-4">{book.authors.map((author) => author.name).join(", ")}</p>
                <p className="text-white-700 mb-4">ISBN: {book.isbn}</p>
                <p className="text font-bold">Published: {book.publishingDate}</p>
                <p className="text-white-700 mb-4">Editorial: {book.editorial.name}</p>
                <p className="text-white-700 mb-4">{book.description}</p>
            </div>
            <Link
                    className="bg-gray-500 text-white font-bold py-2 px-6 rounded hover:bg-gray-600 disabled:bg-gray-300 inline-block text-center"
                    href="/books"
                >
                Cancel
            </Link>
        </div>
    );
};
"use client";

import { useEffect, useState } from "react";
import { useBooks } from "../hooks/useBooks";
import { Book } from "../types/book";
import Image from "next/image";
import Link from "next/link";
import ReviewCard from "../ui/ReviewCard";


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
        <div className="max-w-6xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold">{book.name}</h1>
                    <p className="text-lg text-white-600">
                        {book.authors.map((author) => author.name).join(", ")}
                    </p>
                    
                    <div className="space-y-2">
                        <p className="text-white-700">
                            <span className="font-semibold">ISBN:</span> {book.isbn}
                        </p>
                        <p className="text-white-700">
                            <span className="font-semibold">Published:</span> {book.publishingDate}
                        </p>
                        <p className="text-white-700">
                            <span className="font-semibold">Editorial:</span> {book.editorial.name}
                        </p>
                    </div>
                    
                    <div className="pt-4">
                        <h2 className="text-lg font-semibold mb-2">Description</h2>
                        <p className="text-white-700 leading-relaxed">{book.description}</p>
                    </div>
                    
                    <div className="pt-4">
                        <Link
                            className="bg-gray-500 text-white font-bold py-2 px-6 rounded hover:bg-white-600 inline-block text-center"
                            href="/books"
                        >
                            Back
                        </Link>
                    </div>
                </div>
                
                <div className="relative">
                    <Image
                        src={book.image}
                        alt={`Photo of ${book.name}`}
                        width={500}
                        height={700}
                        className="w-full h-auto max-h-128 object-contain"
                    />
                </div>
            </div>
            
            <div className="border-t pt-8">
                <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
                
                {book.reviews && book.reviews.length > 0 ? (
                    <div className="space-y-4">
                        {book.reviews.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                ) : (
                    <p className="text-white-600 text-center py-8">
                        There are no reviews for the book
                    </p>
                )}
            </div>
        </div>
    );
};
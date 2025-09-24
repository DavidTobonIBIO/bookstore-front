"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Book } from '@/modules/books/types/book';

type BookCardProps = {
  book: Book;
};

export default function BookCard ({ book }: BookCardProps) {
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
        <p className="text font-bold">Published: {book.publishingDate}</p>
        <p className="text-white-700 mb-4">{book.description}</p>
        
        <div className="flex gap-2 mt-4">
          <Link
            href={`/books/${book.id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 flex-1 text-center"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};
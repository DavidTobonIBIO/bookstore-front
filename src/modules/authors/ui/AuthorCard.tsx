"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Author } from '@/modules/authors/types/author';
import { useAuthors } from '@/modules/authors/hooks/useAuthors';

type AuthorCardProps = {
  author: Author;
};

export default function AuthorCard ({ author }: AuthorCardProps) {
  const { deleteAuthor } = useAuthors();

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${author.name}?`)) {
      try {
        await deleteAuthor(author.id);
      } catch (error) {
        console.error('Error deleting author:', error);
      }
    }
  };

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden max-w-sm">
      <Image
        src={author.image}
        alt={`Photo of ${author.name}`}
        width={500}
        height={500}
        className="w-full h-80 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{author.name}</h3>
        <p className="text font-bold">Born: {author.birthDate}</p>
        <p className="text-white-700 mb-4">{author.description}</p>
        
        <div className="flex gap-2 mt-4">
          <Link
            href={`/authors/${author.id}/edit`}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 flex-1 text-center"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 flex-1"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
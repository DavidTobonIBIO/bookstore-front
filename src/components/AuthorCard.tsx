import React from 'react';
import Image from 'next/image';
import { Author } from '@/types/author';

type AuthorCardProps = {
  author: Author;
};

export default function AuthorCard ({ author }: AuthorCardProps) {
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
        <p className="text-white-700">{author.description}</p>
      </div>
    </div>
  );
};
import React from 'react';
import { Review } from '@/modules/books/types/review';

type ReviewCardProps = {
  review: Review;
};

export default function ReviewCard ({ review }: ReviewCardProps) {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden max-w-sm">
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{review.name}</h3>
        <p className="text font-bold">From: {review.source}</p>
        <p className="text-white-700 mb-4">{review.description}</p>
      </div>
    </div>
  );
};
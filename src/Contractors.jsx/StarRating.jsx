import React from 'react';

export const StarRating = ({ value, onChange }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div>
      {stars.map((star) => (
        <span
          key={star}
          className={`cursor-pointer text-2xl ${
            star <= value ? 'text-yellow-500' : 'text-gray-300'
          }`}
          onClick={() => onChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { getReviews } from '../managers/ContractorReview';


const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await getReviews();
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts
  
  const StarRating = ({ value, star }) => (
    <span className={`cursor-pointer text-2xl ${
      star <= value ? 'text-yellow-500' : 'text-gray-300'
    }`}>★</span>
  );
  return (
    <div className="min-h-screen w-full bg-gradient-to-t from-gray-300 to-gray-100 flex flex-col items-center justify-center">
      <div className="mx-auto max-w-screen-md w-full p-6">
        <h1 className="title text-center mb-6">Contractor Reviews</h1>
        <ul className="reviews-list grid gap-6">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="review--container border rounded overflow-hidden bg-white shadow-md p-4"
            >
              <div className="mb-2">
                <p className="font-bold text-lg">Customer: {review.customer_username}</p>
                <p className="font-bold text-lg">Contractor: {review.contractor_username}</p>
              </div>
              <div className="mb-2">
                <p className="font-bold text-lg">Rating: {review.rating}</p>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarRating key={star} value={review.rating} star={star} />
                  ))}
                </div>
                <p className="font-bold text-lg">Comment: {review.comment}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default ReviewsList;
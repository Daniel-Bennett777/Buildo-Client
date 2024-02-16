import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewsOfContractor } from '../managers/ContractorReview';

export const ReviewsList = ({ currentUser }) => {
  const { contractorId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await getReviewsOfContractor(contractorId);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching contractor reviews:', error);
      }
    };

    fetchReviews();
  }, [contractorId]);

  // Render UI with the fetched reviews...
 // Empty dependency array ensures the effect runs once when the component mounts
  
  const StarRating = ({ value, star }) => (
    <span className={`cursor-pointer text-2xl ${
      star <= value ? 'text-yellow-500' : 'text-gray-300'
    }`}>★</span>
  );
  return (
    <div
    className="min-h-screen bg-fixed bg-center bg-cover" 
    style={{ backgroundImage: 'url(/images/dark-concrete-texture-background.jpg)' }}
  >
      <div className="mx-auto max-w-screen-md w-full p-6">
        <h1 className="my-big-font text-orange-500 title text-center mb-6" style={{ fontSize: '2rem' }}>Contractor Reviews</h1>
        <ul className="reviews-list grid gap-6">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="review--container border rounded overflow-hidden bg-white shadow-md p-4"
            >
              <div className="mb-2">
                <p className="font-bold text-lg">Customer: {review.customer_username}</p>
                <p className="font-bold text-lg">Contractor: {review.contractor_username}</p>
                <p className="font-bold text-lg">Review Picture</p>
                <img
                  src={review.profile_image_url}
                  alt={`Review ${review.id}`}
                  className="w-full h-auto border border-black rounded"
                />
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
  )};

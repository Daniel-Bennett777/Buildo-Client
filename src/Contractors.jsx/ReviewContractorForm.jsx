// ReviewForm.jsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { createReview } from '../managers/ContractorReview';
import StarRating from './StarRating';


const ReviewForm = () => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1); // Set a default value, adjust as needed
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const { contractorId } = useParams();

  console.log('Contractor Id:', contractorId);

  const handleSubmit = async () => {
    try {
      // Other form data
      const formData = {
        comment,
        rating,
        profile_image_url: profileImageUrl,
        contractorId,  // Include the contractorId in the form data
      };
  
      // Call the API function to create a review
      await createReview(formData);
  
      // Handle success or navigation after the review is submitted
    } catch (error) {
      // Handle errors, e.g., show an error message to the user
      console.error('Error submitting review:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-screen-md p-4">
      <div className="mb-6">
        <label htmlFor="comment" className="block text-md font-medium text-gray-700 mb-2">
          Additional Comments
        </label>
        <textarea
          id="comment"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-md font-medium text-gray-700 mb-2">
          Rating
        </label>
        <StarRating

          
          value={rating}
          onChange={(newRating) => setRating(newRating)}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="profileImageUrl" className="block text-md font-medium text-gray-700 mb-2">
          Picture of Contractors Work for You
        </label>
        <input
          type="text"
          id="profileImageUrl"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="profileImageUrl"
          value={profileImageUrl}
          onChange={(e) => setProfileImageUrl(e.target.value)}
        />
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-blue hover:bg-blue-700 text-black font-bold py-2 px-4 rounded" type="submit">
            Submit
          </button>
        </div>
        {/* Add Cancel button or any other actions if needed */}
      </div>
    </form>
  );
};

export default ReviewForm;
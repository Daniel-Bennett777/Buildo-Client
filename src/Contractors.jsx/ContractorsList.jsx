import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAvailableContractors } from '../managers/GetContractors';
import { getReviews, getReviewsOfContractor } from '../managers/ContractorReview';
import ".././Fonts/Fonts.css"


export const AvailableContractors = ({ currentUser }) => {
  const [contractors, setContractors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const availableContractors = await getAvailableContractors();
        const contractorsWithReviews = await calculateAverageRatings(availableContractors);
        setContractors(contractorsWithReviews);
      } catch (error) {
        console.error('Error fetching available contractors:', error);
      }
    };

    fetchContractors();
  }, []);

  const calculateAverageRatings = async (contractors) => {
    const contractorsWithReviews = [];
  
    for (const contractor of contractors) {
      const reviews = await getReviews(contractor.id);
  
      // Find the review associated with the current contractor
      const contractorReview = reviews.find(review => review.contractor.id === contractor.id);
  
      if (contractorReview) {
        // Add rating property to the contractor
        contractor.rating = contractorReview.rating;
      }
  
      contractorsWithReviews.push(contractor);
    }
  
    return contractorsWithReviews;
  };

  const getReviewsForContractor = async (contractorId) => {
    try {
      const reviewsData = await getReviewsOfContractor(contractorId);
      console.log(`Reviews for contractor ${contractorId}:`, reviewsData);
      return reviewsData;
    } catch (error) {
      console.error('Error fetching reviews for contractor:', error);
      return [];
    }
  };

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      return 0;  // Default value if no reviews
    }
  
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  const handleReviewClick = (contractorId) => {
    // Navigate to the review form
    navigate(`/createreview/${contractorId}`);
  };

  return (
    <div className="min-h-screen bg-fixed bg-center bg-cover" style={{ backgroundImage: 'url(/images/dark-concrete-texture-background.jpg)' }}>
      <div className="mx-auto max-w-screen-md py-6 p-4">
        <h2 className="my-big-font text-orange-500 title text-center font-bold mb-6" style={{ fontSize: '2rem' }}>Available Contractors</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contractors.map((contractor) => (
            <li key={contractor.id} className="border rounded-lg overflow-hidden bg-white shadow-md bg-gradient-to-r from-gray-300 to-orange-200">
              <div className="p-4">
                <p className="font-bold mb-2 text-black">Full Name: {contractor.full_name}</p>
                {/* Display average star rating */}
                <div className="flex items-center mb-2" onClick={() => navigate(`/reviews/${contractor.id}`)}>
                Actual Rating: {contractor.rating ? contractor.rating.toFixed(2) : 'No Reviews'} {/* Assume contractor.rating is a property with the rating */}
                {contractor.rating && (
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={`cursor-pointer text-2xl ${
                        star <= contractor.rating ? 'text-yellow-500' : 'text-gray-300'
                      }`}>★</span>
                    ))}
                  </div>
                )}
              </div>
                <img
                  src={contractor.profile_image_url}
                  alt={`Contractor ${contractor.id}`}
                  className="w-full h-auto border border-black rounded"
                />
                <p className="font-bold mb-4 text-red-600">Username: {contractor.username}</p>
                <p className="my-custom-font mb-4 text-gray-600">Bio: {contractor.bio}</p>
                <p className="my-custom-font mb-4 text-gray-600">Qualifications: {contractor.qualifications}</p>
                <p className="my-custom-font mb-4 text-gray-600">Created On: {contractor.created_on}</p>
                <p className="my-custom-font mb-4 text-gray-600">State Name: {contractor.state_name}</p>
                <p className="my-custom-font mb-4 text-gray-600">County Name: {contractor.county_name}</p>
                {contractor.is_reviewable && (
                  <button
                    onClick={() => handleReviewClick(contractor.id)}
                    className="bg-orange-500 hover:bg-orange-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Review
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )};
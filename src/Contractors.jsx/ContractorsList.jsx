import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAvailableContractors } from '../managers/GetContractors';
import ".././Fonts/Fonts.css"


const AvailableContractors = ({ currentUser }) => {
  const [contractors, setContractors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const availableContractors = await getAvailableContractors();
        setContractors(availableContractors);
      } catch (error) {
        console.error('Error fetching available contractors:', error);
      }
    };

    fetchContractors();
  }, []);

  const handleReviewClick = (contractorId) => {
    // Navigate to the review form
    navigate(`/createreview/${contractorId}`);
  };

  return (
    <div     className="min-h-screen bg-fixed bg-center bg-cover" 
    style={{ backgroundImage: 'url(/images/dark-concrete-texture-background.jpg)' }}
  >
      <div className="mx-auto max-w-screen-md py-6 p-4">
        <h2 className="my-big-font text-orange-500 title text-center font-bold mb-6" style={{ fontSize: '2rem' }}>Available Contractors</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contractors.map((contractor) => (
            <li key={contractor.id} className="border rounded-lg overflow-hidden bg-white shadow-md bg-gradient-to-r from-gray-300 to-orange-200">
              <div className="p-4">
                <p className="font-bold mb-2 text-black">Full Name: {contractor.full_name}</p>
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
  );
};

export default AvailableContractors;
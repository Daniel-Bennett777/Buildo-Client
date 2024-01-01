import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAvailableContractors } from '../managers/GetContractors';


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
    console.log('Contractor Id:', contractorId);
    // Navigate to the review form
    navigate(`/createreview/${contractorId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-300 to-gray-100">
      <div className="mt-6 mx-auto max-w-screen-md p-4">
        <h2 className="title text-center font-bold mb-6">Available Contractors</h2>
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
                <p className="font-normal mb-4 text-gray-600">Bio: {contractor.bio}</p>
                <p className="font-normal mb-4 text-gray-600">Qualifications: {contractor.qualifications}</p>
                <p className="font-normal mb-4 text-gray-600">Created On: {contractor.created_on}</p>
                <p className="font-normal mb-4 text-gray-600">State Name: {contractor.state_name}</p>
                <p className="font-normal mb-4 text-gray-600">County Name: {contractor.county_name}</p>
                {contractor.is_reviewable && (
                  <button
                    onClick={() => handleReviewClick(contractor.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Review
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
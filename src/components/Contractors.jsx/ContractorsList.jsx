import React, { useEffect, useState } from 'react';
import { getAvailableContractors } from '../../managers/GetContractors';


const AvailableContractors = ({ currentUser }) => {
  const [contractors, setContractors] = useState([]);

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

  return (
    <div>
      <h2>Available Contractors</h2>
      <ul>
        {contractors.map((contractor) => (
          <li key={contractor.id}>
            <p>Username: {contractor.username}</p>
            <p>Qualifications: {contractor.qualifications}</p>
            {/* Add other contractor information */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableContractors;
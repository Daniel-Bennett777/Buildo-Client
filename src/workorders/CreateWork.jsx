import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createWorkOrder } from "../managers/GetWorkOrders";
import ".././Fonts/Fonts.css"

export const CreateWorkOrderForm = ({ currentUser }) => {
  const [serviceType, setServiceType] = useState("");
  const [stateName, setStateName] = useState("");
  const [countyName, setCountyName] = useState("");
  const [description, setDescription] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [status, setStatus] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new work order
    const newWorkOrder = {
      service_type: serviceType,
      state_name: stateName,
      county_name: countyName,
      description: description,
      profile_image_url: profileImageUrl,
      status: status // You may need to set the correct status ID for the initial status
    };

    try {
      // Call the API to create the work order
      const createdWorkOrder = await createWorkOrder(newWorkOrder);

      // Redirect to the work order details page after creation
      navigate(`/`);
    } catch (error) {
      // Handle error, e.g., show an error message to the user
      console.error("Error creating work order:", error);
    }
  };
  const handleCancel = () => {
    // Navigate to the home page when the cancel button is clicked
    navigate('/');
  };

  return (
    <div
    className="min-h-screen bg-fixed bg-center bg-cover" 
    style={{ backgroundImage: 'url(/images/dark-concrete-texture-background.jpg)' }}
  >
    <div className="mx-auto max-w-screen-md py-6">
      <h1 className="my-big-font text-orange-500 title text-center mb-6" style={{ fontSize: '2rem' }}>Create New Work Order</h1>
      <form onSubmit={handleSubmit}>
        {/* Service Type */}
        <div className="mb-4">
          <label htmlFor="serviceType" className="block text-md font-medium text-orange-500 mb-2">
            Service Type
          </label>
          <input
            type="text"
            id="serviceType"
            name="serviceType"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-orange-500 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* State Name */}
        <div className="mb-4">
          <label htmlFor="stateName" className="block text-md font-medium text-orange-500 mb-2">
            State Name
          </label>
          <input
            type="text"
            id="stateName"
            name="stateName"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-orange-500 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* County Name */}
        <div className="mb-4">
          <label htmlFor="countyName" className="block text-md font-medium text-orange-500 mb-2">
            County Name
          </label>
          <input
            type="text"
            id="countyName"
            name="countyName"
            value={countyName}
            onChange={(e) => setCountyName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-orange-500 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-md font-medium text-orange-500 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-orange-500 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Profile Image URL */}
        <div className="mb-4">
          <label htmlFor="profileImageUrl" className="block text-md font-medium text-orange-500 mb-2">
            Profile Image URL
          </label>
          <input
            type="text"
            id="profileImageUrl"
            name="profileImageUrl"
            value={profileImageUrl}
            onChange={(e) => setProfileImageUrl(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-orange-500 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {/* Status */}
        <div className="mb-4">
          <label className="block text-md font-medium text-orange-500 mb-2">Status</label>
          <div className="flex">
            <label className="mr-4 text-orange-500">
              <input
                type="radio"
                name="status"
                value={1} // Adjust the value based on your status IDs
                checked={status === 1}
                onChange={() => setStatus(1)}
                className="mr-2"
              />
              View Only
            </label>
            <label className="mr-4 text-orange-500">
              <input
                type="radio"
                name="status"
                value={2} // Adjust the value based on your status IDs
                checked={status === 2}
                onChange={() => setStatus(2)}
                className="mr-2"
              />
              Accepting Responses
            </label>
            {/* Add more radio buttons as needed */}
          </div>
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Work Order
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded float-right"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};
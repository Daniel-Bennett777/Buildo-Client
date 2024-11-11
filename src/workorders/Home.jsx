import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWorkOrders } from "../managers/GetWorkOrders";
import "../Fonts/Fonts.css";
import { fetchContractorJobRequests } from "../managers/GetContractorRequests";

export const WorkOrderList = ({ currentUser }) => {
  const [workOrders, setWorkOrders] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  const [showPhoneNumberFormMap, setShowPhoneNumberFormMap] = useState({});
  const [contractorPhoneNumber, setContractorPhoneNumber] = useState('');
  const [contractorJobRequests, setContractorJobRequests] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // Fetch Contractor Job Requests
  useEffect(() => {
    if (currentUser && currentUser.token) {
      fetchContractorJobRequests()
        .then((jobRequests) => setContractorJobRequests(jobRequests))
        .catch((error) => console.error('Error fetching contractor job requests:', error));
    }
  }, [currentUser, reloadData]);

  // Fetch Work Orders
  useEffect(() => {
    if (currentUser && currentUser.token) {
      getWorkOrders()
        .then((workOrderArray) => setWorkOrders(workOrderArray))
        .catch((error) => console.error('Error fetching work orders:', error));
    }
  }, [currentUser, reloadData]);

  // Cancel Job Request
  const handleCancelRequest = async (jobRequestId) => {
    try {
      const response = await fetch(`http://localhost:8000/job_requests/${jobRequestId}/cancel_request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${currentUser.token}`,
        },
      });

      if (!response.ok) {
        console.error('Error response:', await response.text());
        throw new Error('Failed to cancel the job request. Please try again.');
      }

      setReloadData((prev) => !prev);
    } catch (error) {
      console.error('Error canceling the job request:', error.message);
    }
  };

  // Request Job
  const handleRequestJob = (workOrderId) => {
    setShowPhoneNumberFormMap((prev) => ({
      ...prev,
      [workOrderId]: true,
    }));
  };

  // Submit Phone Number
  const handleSubmitPhoneNumber = async (workOrderId) => {
    try {
      if (!contractorPhoneNumber.trim()) {
        throw new Error('Please enter a valid phone number.');
      }

      const contractorPhoneNumberInt = parseInt(contractorPhoneNumber, 10);

      const response = await fetch(`http://localhost:8000/job_requests/create_job_request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${currentUser.token}`,
        },
        body: JSON.stringify({
          work_order: workOrderId,
          request_status: 1,
          contractor_cellphone: contractorPhoneNumberInt,
        }),
      });

      if (!response.ok) {
        console.error('Error response:', await response.text());
        throw new Error('Failed to request the job. Please try again.');
      }

      setReloadData((prev) => !prev);
      setShowPhoneNumberFormMap((prev) => ({
        ...prev,
        [workOrderId]: false,
      }));
    } catch (error) {
      console.error('Error requesting this job:', error.message);
    }
  };

  return (
    <div className="min-h-screen bg-fixed bg-center bg-cover" style={{ backgroundImage: 'url(/images/dark-concrete-texture-background.jpg)' }}>
      <div className="mx-auto max-w-screen-md w-full p-3">
        <div className="mb-10 flex justify-end">
          {currentUser?.rare_user && !currentUser.rare_user.is_contractor && (
            <button
              className="mt-10 bg-gradient-to-b from-orange-500 to-orange-300 hover:from-orange-600 hover:to-orange-400 text-black font-bold py-3 px-6 rounded transform transition-transform duration-300 hover:scale-105"
              onClick={() => navigate("/creatework")}
            >
              Add Work Post &nbsp;
              <i className="fa-solid fa-pencil text-black"></i>
            </button>
          )}
        </div>
        <h1 className="mb-10 my-big-font title text-center text-orange-500" style={{ fontSize: '2rem' }}>All Work Orders</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workOrders.map((workOrder) => (
            <li key={workOrder.id} className="work-order--container border border-black rounded overflow-hidden bg-gray-300 shadow-md">
              <div className="p-4">
                <p className="my-custom-font text-sm">{workOrder.date_posted}</p>
                <p className="my-big-font text-lg font-bold mb-2">{workOrder.service_type}</p>
                <p className="my-big-font font-bold text-red-700">Status: {workOrder.status.status}</p>
                {workOrder.customer && (
                  <div className="mt-4">
                    <p className="my-custom-font">Customer: {workOrder.customer.first_name} {workOrder.customer.last_name}</p>
                    <p className="my-custom-font">Customer Username: {workOrder.customer.username}</p>
                    {workOrder.contractor && (
                      <div>
                        <p className="my-custom-font">Contractor: {workOrder.contractor.first_name} {workOrder.contractor.last_name}</p>
                        <p className="my-custom-font">Contractor Username: {workOrder.contractor.username}</p>
                        <p className="my-custom-font">Contractors Qualifications: {workOrder.contractor.qualifications}</p>
                      </div>
                    )}
                    <p className="my-custom-font">State: {workOrder.state_name}</p>
                    <p className="my-custom-font">County: {workOrder.county_name}</p>
                    <p className="my-custom-font">Description: {workOrder.description}</p>
                    <img
                      src={`http://localhost:8000/media/${workOrder.profile_image}`} // Ensure this points to correct field in your API
                      alt={`Work Order ${workOrder.id}`}
                      className="w-full h-auto mt-4"
                    />
                    {currentUser?.rare_user?.is_contractor && !workOrder.contractor && (
                      <div>
                        {showPhoneNumberFormMap[workOrder.id] ? (
                          <div>
                            <input
                              type="text"
                              placeholder="Please Enter your phone number here"
                              value={contractorPhoneNumber}
                              onChange={(e) => setContractorPhoneNumber(e.target.value)}
                            />
                            <input
                              type="file"
                              onChange={(e) => setFile(e.target.files[0])}
                            />
                            <button
                              className="block mx-auto mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleSubmitPhoneNumber(workOrder.id)}
                            >
                              Request Job &nbsp;
                              <i className="fa-solid fa-hammer"></i>
                            </button>
                          </div>
                        ) : (
                          <button
                            className="block mx-auto mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleRequestJob(workOrder.id)}
                          >
                            Request Job &nbsp;
                            <i className="fa-solid fa-hammer"></i>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
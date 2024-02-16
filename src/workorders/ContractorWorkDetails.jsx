import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decommitWorkOrder, getContractorMyBuildos, markWorkOrderComplete } from "../managers/GetContractors";
import ".././Fonts/Fonts.css"

export const ContractorMyBuildos = ({ currentUser }) => {
  const [contractorMyBuildos, setContractorMyBuildos] = useState([]);
  const [selectedWorkOrderId, setSelectedWorkOrderId] = useState(null);
  const [reloadData, setReloadData] = useState(false);
  const [isMarkCompleteModalOpen, setMarkCompleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchContractorMyBuildos = async () => {
    try {
      const myBuildos = await getContractorMyBuildos();
      setContractorMyBuildos(myBuildos || []);
    } catch (error) {
      console.error("Error fetching contractor work orders:", error.message);
    }
  };

  const openMarkCompleteModal = (workOrderId) => {
    setSelectedWorkOrderId(workOrderId);
    setMarkCompleteModalOpen(true);
  };

  const closeMarkCompleteModal = () => {
    setSelectedWorkOrderId(null);
    setMarkCompleteModalOpen(false);
  };

  const confirmMarkComplete = async () => {
    try {
      // Make a request to the backend to mark the job as complete
      await markWorkOrderComplete(selectedWorkOrderId);

      // Refresh the list of work orders after marking one as complete
      fetchContractorMyBuildos();
    } catch (error) {
      console.error("Error marking job as complete:", error.message);
      // Handle the error appropriately
    } finally {
      // Close the "Mark Complete" modal
      closeMarkCompleteModal();
    }
  };

  const markComplete = (workOrderId) => {
    // Open the "Mark Complete" modal before marking the job as complete
    openMarkCompleteModal(workOrderId);
  };

  const decommit = async (workOrderId) => {
    try {
      await decommitWorkOrder(workOrderId);
      setReloadData((prev) => !prev); // Toggle the state to trigger a re-fetch
    } catch (error) {
      console.error("Error decommiting work order:", error.message);
    }
  };

  useEffect(() => {
    const fetchContractorMyBuildos = async () => {
      try {
        const myBuildos = await getContractorMyBuildos();
        // Sort the work orders by status, with 'Complete' orders at the bottom
        const sortedBuildos = myBuildos.sort((a, b) => {
          if (a.status.status === 'Complete' && b.status.status !== 'Complete') {
            return 1;
          } else if (a.status.status !== 'Complete' && b.status.status === 'Complete') {
            return -1;
          } else {
            return 0;
          }
        });
        setContractorMyBuildos(sortedBuildos || []);
      } catch (error) {
        console.error("Error fetching contractor work orders:", error.message);
      }
    };
  
    fetchContractorMyBuildos();
  }, [reloadData]);
  

  // Render the contractor work orders
  return (
    <div
    className="min-h-screen bg-fixed bg-center bg-cover" 
    style={{ backgroundImage: 'url(/images/dark-concrete-texture-background.jpg)' }}
  >
    <div className=" mx-auto max-w-screen-md">
      <h1 className="my-custom-font title text-orange-400 text-center py-6 mb-6">My Buildos (Contractor View)</h1>
      <ul className="work-orders--container grid gap-6">
        {contractorMyBuildos.map((workOrder) => (
          <li key={workOrder.id} className="work-order--container border rounded overflow-hidden bg-white shadow-md">
            <div className="p-4">
              <p className="text-sm">{workOrder.date_posted}</p>
              <p className="text-lg font-bold mb-2">{workOrder.service_type}</p>
              <p className="font-bold text-red-700">Status: {workOrder.status.status}</p>
              {workOrder.customer && (
                <div className="mt-4">
                  <p>Customer: {workOrder.customer.first_name} {workOrder.customer.last_name}</p>
                  <p>Customer Username: {workOrder.customer.username}</p>
                  {workOrder.contractor && (
                    <div>
                      <p>Contractor: {workOrder.contractor.first_name} {workOrder.contractor.last_name}</p> 
                      <p>Contractor Username: {workOrder.contractor.username}</p>
                      <p>Contractors Qualifications: {workOrder.contractor.qualifications}</p>
                    </div>
                  )}
                  {/* Additional content */}
                  <p>State: {workOrder.state_name}</p>
                  <p>County: {workOrder.county_name}</p>
                  <p>Description: {workOrder.description}</p>
                  <img
                    src={workOrder.profile_image_url}
                    alt={`Work Order ${workOrder.id}`}
                    className="w-full h-auto mt-4"
                  />
                  {/* Conditionally render the "Mark Complete" button based on the status */}
                  {currentUser.rare_user.is_contractor && workOrder.status.status !== 'Complete' && (
                    <button
                      className="block mx-auto mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => markComplete(workOrder.id)}
                    >
                      Mark Complete
                    </button>
                  )}
                  {/* Conditionally render the "Decommit" button based on the status */}
                  {currentUser.rare_user.is_contractor && workOrder.status.status !== 'Complete' && (
                    <button
                      className="block mx-auto mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => decommit(workOrder.id)}
                    >
                      Decommit
                    </button>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
       {/* "Mark Complete" Modal */}
       {isMarkCompleteModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="relative bg-white p-8 rounded shadow-md">
            <p className="mb-4">Are you sure you want to mark this job as complete?</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 mr-2 bg-green-500 text-white rounded hover:bg-green-700"
                onClick={confirmMarkComplete}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                onClick={closeMarkCompleteModal}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div> 
  );
};


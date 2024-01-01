import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWorkOrders } from "../managers/GetWorkOrders";


export const WorkOrderList = ({ currentUser }) => {
  const [workOrders, setWorkOrders] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getWorkOrders().then((workOrderArray) => {
      setWorkOrders(workOrderArray);
    });
  }, [currentUser, reloadData]);
  const handleAcceptJob = async (workOrderId) => {
    try {
      const response = await fetch(`http://localhost:8000/work_orders/${workOrderId}/accept_job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${currentUser.token}`,
        },
      });
  
      if (!response.ok) {
        console.error('Error response:', await response.text()); // Log the full response
        throw new Error('Failed to accept the job. Please try again.');
      }

      // Toggle the state to trigger a re-fetch
      setReloadData((prev) => !prev);
    } catch (error) {
      console.error('Error accepting the job:', error.message);
      // Handle the error appropriately (e.g., show a notification to the user)
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-t from-gray-300 to-gray-100 flex flex-col items-center justify-center">
      <div className="mx-auto max-w-screen-md w-full p-6">
        <div className="mb-4 flex justify-end">
        {!currentUser.rare_user.is_contractor && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                // Add the logic to navigate to the "Add Post" page
                navigate("/creatework");
              }}
            >
              Add Post
            </button>
          )}
        </div>
        <h1 className="title text-center mb-6">All Work Orders</h1>
        <ul className="work-orders--container grid gap-6">
          
          {workOrders.map((workOrder) => (
            <li
              key={workOrder.id}
              className="work-order--container border rounded overflow-hidden bg-white shadow-md"
            >
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
                    {currentUser.rare_user.is_contractor && !workOrder.contractor && (
                      <button
                        className="block mx-auto mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleAcceptJob(workOrder.id)}
                      >
                        Accept Job
                      </button>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )}
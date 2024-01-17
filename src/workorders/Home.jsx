import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWorkOrders } from "../managers/GetWorkOrders";
import ".././Fonts/Fonts.css"


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
  <div
    className="min-h-screen bg-fixed bg-center bg-cover" 
    style={{ backgroundImage: 'url(/images/dark-concrete-texture-background.jpg)' }}
  >
      <div className="mx-auto max-w-screen-md w-full p-3">
        <div className="mb-10 flex justify-end">
        {!currentUser.rare_user.is_contractor && (
            <button
              className=" mt-10 bg-gradient-to-b from-orange-500 to-orange-300 hover:from-orange-600 hover:to-orange-400 text-black font-bold py-3 px-6 rounded transform transition-transform duration-300 hover:scale-105"
              onClick={() => {
                // Add the logic to navigate to the "Add Post" page
                navigate("/creatework");
              }}
            >
              Add Work Post &nbsp;
              <i className="fa-solid fa-pencil text-black" ></i>

              </button>
          )}
        </div>
        <h1 className="mb-10 my-big-font title text-center text-orange-500"  style={{ fontSize: '2rem' }} >All Work Orders</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {workOrders.map((workOrder) => (
            <li
              key={workOrder.id}
              className="work-order--container border border-black rounded overflow-hidden bg-gray-300 shadow-md"
            >
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
                    {/* Additional content */}
                    <p className="my-custom-font" >State: {workOrder.state_name}</p>
                    <p className="my-custom-font" >County: {workOrder.county_name}</p>
                    <p className="my-custom-font" >Description: {workOrder.description}</p>
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
                        Accept Job &nbsp;
                        <i className="fa-solid fa-hammer"></i>
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
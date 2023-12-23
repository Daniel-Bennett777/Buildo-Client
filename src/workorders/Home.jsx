import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWorkOrders } from "../managers/GetWorkOrders";


export const WorkOrderList = ({ currentUser }) => {
  const [workOrders, setWorkOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getWorkOrders().then((workOrderArray) => {
      setWorkOrders(workOrderArray);
    });
  }, [currentUser]);

  return (
    <div className="mt-6 mx-auto max-w-screen-md">
      <div className="mb-4 flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            // Add the logic to navigate to the "Add Post" page
            navigate("/creatework");
          }}
        >
          Add Post
        </button>
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
              <p>Status: {workOrder.status.status}</p>
              {workOrder.customer && (
                <div className="mt-4">
                <p>Customer: {workOrder.customer.first_name} {workOrder.customer.last_name}</p>
                <p>Username: {workOrder.customer.username}</p>
                {workOrder.contractor && (
                  <div>
                    <p>Contractor: {workOrder.contractor.first_name} {workOrder.contractor.username}</p>
                    <p>Qualifications: {workOrder.contractor.qualifications}</p>
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
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )};
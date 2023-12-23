import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteWorkOrder, updateWorkOrder, getWorkOrdersForCurrentUser } from "../managers/GetWorkOrders";

const MyBuildos = ({ currentUser }) => {
  const [myBuildos, setMyBuildos] = useState([]);
  const [editedWorkOrders, setEditedWorkOrders] = useState({});
  const [selectedWorkOrderId, setSelectedWorkOrderId] = useState(null);

  const navigate = useNavigate();
  const { workOrderId } = useParams();

  const fetchWorkOrders = async () => {
    try {
      const workOrders = await getWorkOrdersForCurrentUser();
      setMyBuildos(workOrders);
    } catch (error) {
      console.error("Error fetching work orders:", error);
    }
  };

  const handleDelete = async (workOrderId) => {
    try {
      await deleteWorkOrder(workOrderId);
      setMyBuildos((prevBuildos) => prevBuildos.filter((order) => order.id !== workOrderId));
    } catch (error) {
      console.error("Error deleting work order:", error);
    }
  };

  const enterEditMode = (workOrderId) => {
    setSelectedWorkOrderId(workOrderId);
    setEditedWorkOrders((prevEditedWorkOrders) => ({
      ...prevEditedWorkOrders,
      [workOrderId]: {
        service_type: myBuildos.find((order) => order.id === workOrderId).service_type,
        state_name: myBuildos.find((order) => order.id === workOrderId).state_name,
        county_name: myBuildos.find((order) => order.id === workOrderId).county_name,
        description: myBuildos.find((order) => order.id === workOrderId).description,
        profile_image_url: myBuildos.find((order) => order.id === workOrderId).profile_image_url,
        status: {
          id: myBuildos.find((order) => order.id === workOrderId).status.id,
        },
      },
    }));
  };

  const submitEdit = async (workOrderId) => {
    try {
      const requestData = {
        ...editedWorkOrders[workOrderId],
        status: {
          id: editedWorkOrders[workOrderId]?.status?.id, // Ensure you are accessing the correct property
        },
      };
  
      // Send the PUT request with the updated data
      const response = await updateWorkOrder(workOrderId, requestData);
  
      if (response !== null) {
        // Update the local state with the edited work order
        setMyBuildos((prevBuildos) =>
          prevBuildos.map((order) =>
            order.id === workOrderId ? { ...order, ...editedWorkOrders[workOrderId] } : order
          )
        );
      }
  
      // Clear the selected work order and edited data
      setSelectedWorkOrderId(null);
      setEditedWorkOrders((prevEditedWorkOrders) => ({
        ...prevEditedWorkOrders,
        [workOrderId]: undefined,
      }));
    } catch (error) {
      console.error("Error updating work order:", error);
    }
  };
  useEffect(() => {
    const fetchWorkOrders = async () => {
      try {
        const workOrders = await getWorkOrdersForCurrentUser();
        setMyBuildos(workOrders || []); // Ensure it's not undefined or null
      } catch (error) {
        console.error("Error fetching work orders:", error.message);
        // Handle the error appropriately
      }
    };
  
    fetchWorkOrders();
  }, [selectedWorkOrderId]);

  // Render the work orders
  return (
    <div className="mt-6 mx-auto max-w-screen-md">
      <h1 className="title text-center mb-6">My Buildos</h1>
      <ul className="work-orders--container grid gap-6">
        {myBuildos.map((workOrder) => (
          <li
            key={workOrder.id}
            className="work-order--container border rounded overflow-hidden bg-white shadow-md"
          >
            <div className="p-4">
              {selectedWorkOrderId === workOrder.id ? (
                // Input fields in edit mode
                <>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Service Type:
                    <input
                      type="text"
                      className="form-input mt-1 block w-full"
                      value={editedWorkOrders[workOrder.id]?.service_type || ""}
                      onChange={(e) =>
                        setEditedWorkOrders((prevEditedWorkOrders) => ({
                          ...prevEditedWorkOrders,
                          [workOrder.id]: {
                            ...prevEditedWorkOrders[workOrder.id],
                            service_type: e.target.value,
                          },
                        }))
                      }
                    />
                  </label>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    State Name:
                    <input
                      type="text"
                      className="form-input mt-1 block w-full"
                      value={editedWorkOrders[workOrder.id]?.state_name || ""}
                      onChange={(e) =>
                        setEditedWorkOrders((prevEditedWorkOrders) => ({
                          ...prevEditedWorkOrders,
                          [workOrder.id]: {
                            ...prevEditedWorkOrders[workOrder.id],
                            state_name: e.target.value,
                          },
                        }))
                      }
                    />
                  </label>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    County Name:
                    <input
                      type="text"
                      className="form-input mt-1 block w-full"
                      value={editedWorkOrders[workOrder.id]?.county_name || ""}
                      onChange={(e) =>
                        setEditedWorkOrders((prevEditedWorkOrders) => ({
                          ...prevEditedWorkOrders,
                          [workOrder.id]: {
                            ...prevEditedWorkOrders[workOrder.id],
                            county_name: e.target.value,
                          },
                        }))
                      }
                    />
                  </label>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description:
                    <textarea
                      className="form-textarea mt-1 block w-full"
                      value={editedWorkOrders[workOrder.id]?.description || ""}
                      onChange={(e) =>
                        setEditedWorkOrders((prevEditedWorkOrders) => ({
                          ...prevEditedWorkOrders,
                          [workOrder.id]: {
                            ...prevEditedWorkOrders[workOrder.id],
                            description: e.target.value,
                          },
                        }))
                      }
                    />
                  </label>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Profile Image URL:
                    <input
                      type="text"
                      className="form-input mt-1 block w-full"
                      value={editedWorkOrders[workOrder.id]?.profile_image_url || ""}
                      onChange={(e) =>
                        setEditedWorkOrders((prevEditedWorkOrders) => ({
                          ...prevEditedWorkOrders,
                          [workOrder.id]: {
                            ...prevEditedWorkOrders[workOrder.id],
                            profile_image_url: e.target.value,
                          },
                        }))
                      }
                    />
                  </label>
                  {/* Add other input fields as needed */}
                  <div className="flex justify-between mt-4">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => submitEdit(workOrder.id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => setSelectedWorkOrderId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                // Display attributes in view mode
                <>
                  <p className="text-lg font-bold mb-2">{workOrder.service_type}</p>
                  <p>Status: {workOrder.status.status}</p>
                  {workOrder.customer && (
                    <div className="mt-4">
                      <p>Customer: {workOrder.customer.first_name}  {workOrder.customer.last_name}</p>
                      <p>Username: {workOrder.customer.username}</p>
                      {workOrder.contractor && (
                        <div>
                          <p>
                            Contractor: {workOrder.contractor.first_name}{" "}
                            {workOrder.contractor.username}
                          </p>
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
                      {/* Edit and Delete buttons */}
                      <div className="flex justify-between mt-4">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => enterEditMode(workOrder.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(workOrder.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBuildos;
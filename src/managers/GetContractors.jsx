
export const getAvailableContractors = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('current_user'));
  
      if (!currentUser || !currentUser.token) {
        throw new Error('User not authenticated');
      }
  
      const response = await fetch(`http://localhost:8000/contractors_list`, {
        headers: {
          Authorization: `Token ${currentUser.token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch contractors');
      }
  
      const contractors = await response.json();
      return contractors;
    } catch (error) {
      console.error('Error fetching available contractors:', error);
      throw error;
    }
  };

  export const getContractorMyBuildos = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('current_user'));
  
      if (!currentUser || !currentUser.token) {
        throw new Error('User not authenticated');
      }
  
      const response = await fetch(`http://localhost:8000/work_orders/my_buildos`, {
        headers: {
          Authorization: `Token ${currentUser.token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch contractor work orders');
      }
  
      const contractorMyBuildos = await response.json();
      return contractorMyBuildos;
    } catch (error) {
      console.error('Error fetching contractor work orders:', error);
      throw error;
    }
  };

  export const markWorkOrderComplete = async (workOrderId) => {
   try {
      const currentUser = JSON.parse(localStorage.getItem('current_user'));
  
      if (!currentUser || !currentUser.token) {
        throw new Error('User not authenticated');
      }
      const response = await fetch(`http://localhost:8000/work_orders/${workOrderId}/mark_complete`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${currentUser.token}`,
            'Content-Type': 'application/json',
          },
          // Add any additional headers if needed (e.g., authentication token)
        
        // You can include a request body if necessary (e.g., additional data to send to the server)
        // body: JSON.stringify({ /* additional data */ }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to mark work order as complete. Status: ${response.status}`);
      }
  
      // You might not need to handle the response body, but you can if necessary
      // const responseData = await response.json();
      // console.log(responseData);
  
      // Return the response or any relevant data
      return response;
    } catch (error) {
      console.error('Error marking work order as complete:', error.message);
      throw error; // Rethrow the error to be handled by the calling code
    }
  };

  export const decommitWorkOrder = async (workOrderId) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('current_user'));
  
      if (!currentUser || !currentUser.token) {
        throw new Error('User not authenticated');
      }
  
      const response = await fetch(`http://localhost:8000/work_orders/${workOrderId}/decommit_work_order`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${currentUser.token}`,
          'Content-Type': 'application/json',
        },
        // You can include a request body if necessary (e.g., additional data to send to the server)
        // body: JSON.stringify({ /* additional data */ }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to decommit work order. Status: ${response.status}`);
      }
  
      // You might not need to handle the response body, but you can if necessary
      // const responseData = await response.json();
      // console.log(responseData);
  
      // Return the response or any relevant data
      return response;
    } catch (error) {
      console.error('Error decommiting work order:', error.message);
      throw error; // Rethrow the error to be handled by the calling code
    }
  };

  
export const getWorkOrders = () => {
    const currentUser = JSON.parse(localStorage.getItem("current_user"));
  
    if (currentUser && currentUser.token) {
      const url = "http://localhost:8000/work_orders";
  
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Token ${currentUser.token}`,
          "Content-Type": "application/json",
        },
      };
  
      return fetch(url, requestOptions)
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error fetching posts:", error);
          // You might want to handle errors appropriately
        });
    } else {
      // Handle the case when there's no user or token
      console.error("User or token not available.");
      // You might want to handle this case appropriately
      return Promise.reject("User or token not available.");
    }
  };
/*export const createWorkOrder = (newWorkOrder) => {
const currentUser = JSON.parse(localStorage.getItem("current_user"));

if (currentUser && currentUser.token) {
    const url = "http://localhost:8000/work_orders";

    const requestOptions = {
    method: "POST",
    headers: {
        Authorization: `Token ${currentUser.token}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify(newWorkOrder), // Include the request body with the new work order data
    };

    return fetch(url, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
        console.error("Error creating work order:", error);
        // You might want to handle errors appropriately
        throw error; // Rethrow the error to be caught by the calling code
    });
} else {
    // Handle the case when there's no user or token
    console.error("User or token not available.");
    // You might want to handle this case appropriately
    return Promise.reject("User or token not available.");
}
};
*/
export const createWorkOrder = (newWorkOrder) => {
  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  if (currentUser && currentUser.token) {
    const url = "http://localhost:8000/work_orders";

    const formData = new FormData();
    for (const key in newWorkOrder) {
      formData.append(key, newWorkOrder[key]);
    }

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Token ${currentUser.token}`,
        // Note: Don't set 'Content-Type' header to let the browser set it as 'multipart/form-data'
      },
      body: formData, // Use FormData object
    };

    return fetch(url, requestOptions)
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error creating work order:", error);
        throw error;
      });
  } else {
    console.error("User or token not available.");
    return Promise.reject("User or token not available.");
  }
};

export const getWorkOrdersForCurrentUser = () => {
  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  if (currentUser && currentUser.token) {
    const url = `http://localhost:8000/work_orders?customer=current`;

    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Token ${currentUser.token}`,
        "Content-Type": "application/json",
      },
    };

    return fetch(url, requestOptions)
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error fetching work orders:", error);
        // You might want to handle errors appropriately
      });
  } else {
    // Handle the case when there's no user or token
    console.error("User or token not available.");
    // You might want to handle this case appropriately
    return Promise.reject("User or token not available.");
  }
};

export const deleteWorkOrder = (workOrderId) => {
  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  if (currentUser && currentUser.token) {
    const url = `http://localhost:8000/work_orders/${workOrderId}`;

    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Token ${currentUser.token}`,
        "Content-Type": "application/json",
      },
    };

    return fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Check if the response body is not empty
      return response.text().then((text) => (text ? JSON.parse(text) : {}));
    })
    .catch((error) => {
      console.error("Error deleting work order:", error);
      // You might want to handle errors appropriately
    });
}};

export const updateWorkOrder = async (workOrderId, updatedAttributes) => {
  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  if (currentUser && currentUser.token) {
    const url = `http://localhost:8000/work_orders/${workOrderId}`;

    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Token ${currentUser.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAttributes),
    };

    try {
      const response = await fetch(url, requestOptions);
      console.log('Update Work Order Response Status:', response.status);

      if (response.status === 204) {
        // Successful update with no content, no need to parse the response body
        return null;
      }

      // For other status codes, parse the response body
      const responseBody = await response.json();
      console.log('Update Work Order Response Body:', responseBody);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return responseBody;
    } catch (error) {
      console.error('Error updating work order:', error);
      throw error;
    }
  } else {
    // Handle the case when there's no user or token
    console.error("User or token not available.");
    // You might want to handle this case appropriately
    return Promise.reject("User or token not available.");
  }
};
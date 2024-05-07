export const fetchContractorJobRequests = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('current_user'));
  
      if (!currentUser || !currentUser.token) {
        throw new Error('User not authenticated');
      }
  
      const response = await fetch('http://localhost:8000/job_requests', {
        headers: {
          Authorization: `Token ${currentUser.token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch contractor job requests');
      }
  
      const jobRequests = await response.json();
      return jobRequests;
    } catch (error) {
      console.error('Error fetching contractor job requests:', error);
      throw error;
    }
  };
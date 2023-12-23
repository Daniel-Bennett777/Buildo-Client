
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
export const canReviewContractor = async (contractorId) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('current_user'));
  
      if (!currentUser || !currentUser.token) {
        throw new Error('User not authenticated');
      }
  
      const response = await fetch(`http://localhost:8000/reviews/can_review_contractor/${contractorId}/`, {
        headers: {
          Authorization: `Token ${currentUser.token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to check if review is allowed');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error checking if review is allowed:', error);
      throw error;
    }
  };
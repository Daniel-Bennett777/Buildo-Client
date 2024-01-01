import { useNavigate } from 'react-router-dom';

export const createReview = async (reviewData) => {
  try {
    const currentUser = JSON.parse(localStorage.getItem('current_user'));

    if (!currentUser || !currentUser.token) {
      throw new Error('User not authenticated');
    }

    const response = await fetch(`http://localhost:8000/reviews`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${currentUser.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create review');
    }
    const navigate = useNavigate();
    navigate('/reviews');

    return response.json();
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

export const getReviews = async () => {
  try {
    const currentUser = JSON.parse(localStorage.getItem('current_user'));

    if (!currentUser || !currentUser.token) {
      throw new Error('User not authenticated');
    }

    const response = await fetch('http://localhost:8000/reviews', {
      method: 'GET',
      headers: {
        Authorization: `Token ${currentUser.token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch reviews');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};
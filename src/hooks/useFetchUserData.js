import { useState, useEffect } from 'react';


import { axiosSecure } from './useAxiosSecure';
import useAuth from './useAuth';

const useFetchUserData = () => {
  const { user } = useAuth(); // Assuming you have a user object from your Auth context
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(`http://localhost:8000/users/${user.email}`);
        
        const dbUser = response.data
        const combinedUser = {
          ...dbUser,
          photo: dbUser.photo || user.photoURL, // Use DB photo if available, otherwise Google photoURL
        };

        setUserData(combinedUser);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user.email, user.photoURL]);

  return { userData, loading, error };
};

export default useFetchUserData;

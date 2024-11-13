import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials:true,
})

const useAxiosSecure = () => {
    const { logout } = useAuth();  // Custom hook for authentication, providing a logout function
    const navigate = useNavigate(); // React Router's hook for programmatically navigating between routes

    useEffect(() => {
        // Adding an interceptor to the axiosSecure instance
        axiosSecure.interceptors.response.use(
            response => {
                return response;  // If the response is successful (no errors), pass it through unchanged
            },
            async error => {
                console.log('error tracked in the interceptor', error.response);

                // If the error status is 401 (Unauthorized) or 403 (Forbidden)
                if (error.response.status === 401 || error.response.status === 403) {
                    await logout();  // Log out the user using the provided logout function
                    navigate('/login');  // Redirect the user to the login page
                }

                // Reject the promise to propagate the error (so it can be handled elsewhere if needed)
                return Promise.reject(error);
            }
        );
    }, [logout, navigate]);

    return axiosSecure;  // Return the configured Axios instance for use
}


export default useAxiosSecure
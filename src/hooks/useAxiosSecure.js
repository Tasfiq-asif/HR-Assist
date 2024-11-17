import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials:true,
})

const useAxiosSecure = () => {
    const { logout } = useAuth();  
    const navigate = useNavigate(); 

    useEffect(() => {
      
        axiosSecure.interceptors.response.use(
            response => {
                return response;  
            },
            async error => {
                console.log('error tracked in the interceptor', error.response);

                if (error.response.status === 401 || error.response.status === 403) {
                    await logout();  
                    navigate('/login');  
                }

             
                return Promise.reject(error);
            }
        );
    }, [logout, navigate]);

    return axiosSecure;  
}


export default useAxiosSecure
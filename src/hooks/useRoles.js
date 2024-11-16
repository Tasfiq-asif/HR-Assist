import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"
import { axiosSecure } from "./useAxiosSecure"


const useRoles =  () =>{
    const {user,loading} = useAuth()

    const {data:role,refetch,isLoading}= useQuery(
        {queryKey: ['role',user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async() =>{
            const {data} =await axiosSecure(`/users/${user.email}`)
            return data.role
        }
        }
    )
    return [role,refetch,isLoading]
}

export default useRoles
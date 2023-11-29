import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useStoreAdmin= () => {
    const secureAxios = useAxiosSecure()
    const { user } = useAuth()

    const { data: isAdmin , isPending: isLoading } = useQuery({
        queryKey : [ user?.email , "isStoreAdmin"],
        queryFn: async() =>{
            const res = await secureAxios.get(`/api/users/admin/${user?.email}`)
            return res.data;
        }
    })
 return [isAdmin , isLoading]
};

export default useStoreAdmin;
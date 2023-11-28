import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useADminData = () => {
    const secureAxios = useAxiosSecure()
    const { user } = useAuth()

    const { data: Admin } = useQuery({
        queryKey : [ user?.email , "isAdmin"],
        queryFn: async() =>{
            const res = await secureAxios.get(`/api/users/admin/${user?.email}`)
            return res.data;
        }
    })
    return {Admin}
};

export default useADminData;
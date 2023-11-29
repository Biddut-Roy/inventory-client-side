import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useStoreAdmin= () => {
    const secureAxios = useAxiosSecure()
    const { user , loading} = useAuth()

    const { data: isStoreAdmin , isPending: isStoreLoading } = useQuery({
        queryKey : [ user?.email , "isStoreAdmin"],
        enabled: !loading,
        queryFn: async() =>{
            const res = await secureAxios.get(`/api/users/store-admin/${user?.email}`)
            return res.data;
        }
    })
 return [isStoreAdmin , isStoreLoading]
};

export default useStoreAdmin;
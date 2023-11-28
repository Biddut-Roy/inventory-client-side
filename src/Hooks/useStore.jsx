import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useStore = () => {
    const secureAxios = useAxiosSecure()
    const { user } = useAuth()

    const { isPending : issPending, refetch: storeRe , data: getStore = {} } = useQuery({
        queryKey: ['shop-data'],
        queryFn: async () => {
            const res = await secureAxios.get(`/shop-data/${user?.email}`)
            return res.data
        }
    })
    return [getStore , storeRe , issPending ]
};

export default useStore;
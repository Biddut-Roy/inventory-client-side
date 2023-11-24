import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useCards = () => {
    const SecureAxios = useAxiosSecure();
    const {user} = useAuth();

    const {refetch , data: cart = [] } = useQuery({
        queryKey: ['cards' , user?.email],
        queryFn: async () => {
            const res = await SecureAxios.get(`/card?email=${user.email}`);
            return res.data ;
        }
    })
    return [cart , refetch ]
};

export default useCards;
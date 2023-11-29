import { Link } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";




const Added = () => {

    const { user } = useAuth()
    const SecureAxios = useAxiosSecure()
    const { isPending, refetch, error, data } = useQuery({
        queryKey: ['products-add'],
        queryFn: async () => {
            const res = await SecureAxios.get(`/shop-products/${user?.email}`)
            return res.data
        }
    })

    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message
    refetch()

    return (
        <div >
            <Helmet>
                <title>IMS || Dashboard</title>
                <link rel="canonical" />
            </Helmet>
            {
              data?.length != 0 ?
                    <div className=" flex flex-col md:flex-row lg:flex-row justify-center text-center md:justify-between lg:justify-between mt-20 md:mx-12 lg:mx-20 border-y-2 border-r-2 border-black border-solid ">
                        <div className=" text-black font-bold text-center">Total {data?.length} Product Added</div>
                        <Link to={'/dashboard/added'}><button className="btn  md:btn-primary lg:btn-wide btn-sm bg-blue-700 ">Add Product</button></Link>
                    </div>
                    :
                    <div className=" text-center mt-20 ">
                        <Link to={'/dashboard/added'}><button className="btn md:btn-primary lg:btn-wide btn-sm bg-blue-700 ">Add Product</button></Link>
                    </div>
            }
        </div>
    );
};

export default Added;
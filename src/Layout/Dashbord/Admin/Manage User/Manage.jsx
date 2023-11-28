import { Toaster } from "react-hot-toast";
import { AiTwotoneNotification } from "react-icons/ai";
import usePublicAxios from "../../../../Hooks/usePublicAxios";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";


const Manage = () => {
    const publicAxios = usePublicAxios()
    const { isPending, error, refetch, data: store = [] } = useQuery({
        queryKey: ['all-store'],
        queryFn: async () => {
            const res = await publicAxios.get('/all-shop-data')
            return res.data?.result
        }
    })
    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message
    refetch()

    // const handelCheckOut = () => {
    //     const checkOutData = {
    //         mainId: products.map(item => item?.mainId)
    //     }
    //     console.log(checkOutData);
    //     publicAxios.patch(`/update-card?email=${user?.email}`, checkOutData)
    //         .then(res => {
    //             console.log(res.data);
    //             toast.success('checkout product!')
    //         })
    // }
    return (
        <div className="min-h-screen bg-gradient-to-r from-green-200 via-green-300 to-blue-500">
            <Helmet>
                <title>IMS || shob_Manage</title>
                <link rel="canonical" />
            </Helmet>
            <table className="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                    <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">

                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Photo</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Name</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Limit</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Description</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Action</th>

                    </tr>
                </thead>
                {
                    store?.map(product => <tbody key={product._id} className="block  md:table-row-group text-black">
                        <tr className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">

                            <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">
                            </span><div className="flex items-center">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={product?.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </div></td>

                            <td className="p-2  md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Name:</span>{product?.shop_name}</td>

                            <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">limit:</span>{product.limit}</td>

                            <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">description:</span>{product.description}</td>

                            <td className=" text-center mt-5  md:mr-10 lg:mr-10 md:mt-10 lg:mt-10">
                                <button className="bg-blue-500 text-2xl md:text-3xl lg:text-4xl hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"><AiTwotoneNotification /></button></td>
                        </tr>
                    </tbody>)
                }
            </table>

            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default Manage;
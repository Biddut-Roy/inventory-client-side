import { MdOutlineDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import useAuth from "../../../../Hooks/useAuth";
import usePublicAxios from "../../../../Hooks/usePublicAxios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet-async";


const Product = () => {
    const { user } = useAuth()
    const publicAxios = usePublicAxios()

    const { isPending, error, refetch, data: products = [] } = useQuery({
        queryKey: ['shop-products'],
        queryFn: async () => {
            const res = await publicAxios.get(`/shop-products/${user?.email}`)
            return res.data
        }
    })
    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message

    refetch()


    const handelDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Delete this product",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                publicAxios.delete(`/delete-product/${id}?count=1&email=${user?.email}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            toast.success('Product deleted successful')
                            refetch()
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        });
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-200 via-green-300 to-blue-500">
            <Helmet>
                <title>IMS || Product</title>
                <link rel="canonical" />
            </Helmet>
            <table className="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                    <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">

                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">image</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Name</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Quantity</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Update</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Delete</th>

                    </tr>
                </thead>
                {
                    products.map(product => <tbody key={product._id} className="block md:table-row-group text-black">
                        <tr className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">

                            <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">
                            </span><div className="flex justify-center">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={product?.photo} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </div></td>

                            <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Name:</span>{product?.product_name}</td>

                            <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Quantity:</span>{product.quantity}</td>

                            <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                                <span className="inline-block w-1/3 md:hidden font-bold">update:</span>
                                <Link to={`/dashboard/updateProduct/${product?._id}`}><button className="btn btn-ghost btn-md text-2xl text-blue-700"><GrDocumentUpdate /></button></Link>
                            </td>
                            <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                                <span className="inline-block w-1/3 md:hidden font-bold">Delete:</span>
                                <button onClick={() => handelDelete(product?._id)} className="btn btn-ghost btn-md  text-red-500 text-2xl "><MdOutlineDelete /></button>
                            </td>
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

export default Product;
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import usePublicAxios from "../../../../Hooks/usePublicAxios";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";


const Product_Section = () => {
    const { user } = useAuth()
    const publicAxios = usePublicAxios()
    const { isPending, error, refetch, data: products } = useQuery({
        queryKey: ['products-collection'],
        queryFn: async () => {
            const res = await publicAxios.get(`/shop-products/${user?.email}`)
            return res.data
        }
    })
    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message
    refetch()

    const handelCheckOut = (id) => {
        
        const checkOutData = {
            mainId: id
        }
        console.log(checkOutData);
        publicAxios.post('/checkOut-card', checkOutData)
            .then(res => {
                console.log(res.data);

                if (res.data._id) {
                    toast.success('add product successful')
                }
            })
    }

    return (

        <table className="min-w-full border-collapse block md:table">
            <thead className="block md:table-header-group">
                <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">id</th>
                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">image</th>
                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Name</th>
                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Quantity</th>
                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Discount</th>
                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Selling_price</th>
                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Check-out</th>
                </tr>
            </thead>
            {
                products.map(product => <tbody key={product._id} className="block md:table-row-group text-black">
                    <tr className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">ID:</span>{product._id}</td>

                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">
                        </span><div className="flex items-center">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={product?.photo} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                            </div></td>

                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Name</span>{product?.product_name}</td>

                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Quantity</span>{product.quantity}</td>

                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Discount</span>{product.discount} %</td>

                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Selling_price</span>Price: {product.sellingPrice}</td>

                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                            <span className="inline-block w-1/3 md:hidden font-bold">Actions</span>
                            <button onClick={() => handelCheckOut(product?._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"><MdOutlineShoppingCartCheckout /></button>
                        </td>
                    </tr>


                    <Toaster
                        position="top-center"
                        reverseOrder={false}
                    />

                </tbody>)
            }

        </table>
    );
};

export default Product_Section;
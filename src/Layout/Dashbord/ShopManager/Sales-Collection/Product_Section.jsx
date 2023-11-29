
import useAuth from "../../../../Hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Product_table from "./Product_table";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


const Product_Section = () => {

    const { user } = useAuth()
    const SecureAxios = useAxiosSecure()
    const [search , setSearch]= useState('')
    const { isPending, error, refetch, data: products = [] } = useQuery({
        queryKey: ['shop-pro'],
        queryFn: async () => {
            const res = await SecureAxios.get(`/shop-product/${user?.email}?search=${search}`)
            return res.data
        }
    })
    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message

    refetch()

    const handelCheckOut = (item) => {

        const { product_name, sellingPrice, photo, discount, cost } = item;

        const checkOutData = {
            mainId: item._id,
            product_name,
            sellingPrice,
            photo,
            discount,
            cost,
            email: user?.email
        }

        SecureAxios.post('/checkOut-card', checkOutData)
            .then(res => {
                if (res.data._id) {
                    toast.success('add product successful')
                }
            })
            
        SecureAxios.patch(`/update-card-item/${item._id}`)
            .then(res => {
                if (res.data._id) {
                    toast.success('add product successful')
                }
            })
            refetch()
    }

    const outOffStock = (quantity) => {
        toast.error(`Product Out of Store : ${quantity}`)
    }

    const handelSearch = (e) => {
        e.preventDefault();
        const searchText = e.target.data.value ;
        setSearch(searchText)
        console.log(searchText);
    }

    return (
        <div>
            <Helmet>
                <title>IMS || Sales</title>
                <link rel="canonical" />
            </Helmet>
            <form onSubmit={handelSearch} className=" m-5">
                <input type="text" name="data" id="" />
                <input className=" btn btn-sm bg-blue-600 " type="submit" value="Search" />
            </form>
            <table className="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                    <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">id</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">image</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Name</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Quantity</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Discount</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Selling_price</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Check-out</th>
                    </tr>
                </thead>
                {
                    products.map(product =><Product_table outOffStock={outOffStock} handelCheckOut={handelCheckOut} product={product} key={product._id}></Product_table> )
                }
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </table>
        </div>
    );
};

export default Product_Section;
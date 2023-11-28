
import useAuth from "../../../../Hooks/useAuth";
import usePublicAxios from "../../../../Hooks/usePublicAxios";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";


const Product_Section = () => {

    // TODO : search function problem

    const { user } = useAuth()
    const [product, setProduct] = useState([])
    const [products, setProducts] = useState([])
    const publicAxios = usePublicAxios()

    const [qun, setQun] = useState(product.quantity)

    useEffect(() => {
        publicAxios.get(`/shop-products/${user?.email}`)
            .then(res => {
                setProduct(res.data)
                setProducts(res.data)
            })
    }, [publicAxios, user?.email])


console.log(product);
    const handelCheckOut = (item) => {

        const { product_name, sellingPrice, photo, discount, cost } = item;
        setQun(qun - 1);

        const checkOutData = {
            mainId: item._id,
            product_name,
            sellingPrice,
            photo,
            discount,
            cost,
            email: user?.email
        }

        publicAxios.post('/checkOut-card', checkOutData)
            .then(res => {
                if (res.data._id) {
                    toast.success('add product successful')
                }
            })
    }


    const handelSearch = (e) => {
        e.preventDefault();
        const searchText = e.target.data.value
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
                    products.map(product => <tbody key={product._id} className="block md:table-row-group text-black">
                        <tr className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
                            <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">ID:</span>{product._id}</td>

                            <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">
                            </span><div className="flex justify-center">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={product?.photo} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </div></td>

                            <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Name</span>{product?.product_name}</td>

                            <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Quantity</span>{product.quantity}</td>

                            <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Discount</span>{product.discount} %</td>

                            <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Selling_price</span>Price: {product.sellingPrice}</td>

                            {
                                qun == 0 ?
                                    <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold">Actions</span>
                                        <button disabled className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"><MdOutlineShoppingCartCheckout /></button>
                                    </td>
                                    :
                                    <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold">Actions</span>
                                        <button onClick={() => {
                                            handelCheckOut(product);
                                           
                                        }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"><MdOutlineShoppingCartCheckout /></button>
                                    </td>
                            }
                        </tr>


                        <Toaster
                            position="top-center"
                            reverseOrder={false}
                        />
                    </tbody>)
                }

            </table>
        </div>
    );
};

export default Product_Section;
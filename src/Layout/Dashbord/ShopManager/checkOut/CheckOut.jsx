import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import usePublicAxios from "../../../../Hooks/usePublicAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Helmet } from "react-helmet-async";



const CheckOut = () => {
    const { user } = useAuth()
    const publicAxios = usePublicAxios()
    const { isPending, error, refetch, data: products = [] } = useQuery({
        queryKey: ['products-checkout'],
        queryFn: async () => {
            const res = await publicAxios.get(`/get-card?email=${user?.email}`)
            return res.data
        }
    })
    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message
    refetch()


const cost = products?.product?.reduce((acc, current) => acc + current.cost, 0);

    const Discount = (products.discount)
    const Total = (products.count)
    const payAmount = (products.totalPay).toFixed(2)
    const payable = parseFloat((payAmount * Discount) / 100)
    const DiscountTotal = payable.toFixed(2)
    const pay = (payAmount - DiscountTotal).toFixed(2)
    const currentDate = new Date();

    const handelCheckOut = () => {
        const checkOutData = {
            mainId: products?.product.map(item => item?.mainId),
            email: user?.email,
            pay,
            date: currentDate,
            cost,

        }

        publicAxios.patch(`/update-card?email=${user?.email}`, checkOutData)
            .then(() => {
                toast.success('checkout product!')
            })

        refetch()
    }

    const exportPdf = async () => {
        const doc = new jsPDF({ orientation: "landscape" });

        doc.autoTable({
            html: "#my-table",
        });

        doc.save("mypdf.pdf");
    };

    return (
        <div id="pdf-content" className="min-h-screen bg-gradient-to-r from-green-200 via-green-300 to-blue-500">
            <Helmet>
                <title>IMS || CheckOut</title>
                <link rel="canonical" />
            </Helmet>
            <table id="my-table" className="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                    <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">

                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">image</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Name</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Quantity</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Discount</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Selling_price</th>

                    </tr>
                </thead>
                {
                    products.product.map(product => <tbody key={product._id} className="block md:table-row-group text-black">
                        <tr className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">

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
                        </tr>
                    </tbody>)
                }
                <tfoot className=" ">
                    <tr className="bg-gray-300 border border-grey-500 text-black md:border-none block md:table-row">

                        <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Total:
                        </span>Total:</td>

                        <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Name</span></td>

                        <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Quantity</span>{Total}</td>

                        <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Discount :</span>Discount: {Discount} %</td>

                        <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Selling_price</span>
                            <h1>Price:{payAmount}</h1> <br />
                            <h1>Pay:{pay}</h1>
                        </td>
                    </tr>
                </tfoot>
            </table>

            <div className=" text-center  md:text-right lg:text-right md:mr-10 lg:mr-10 mt-5">
                <button onClick={() => { exportPdf() , handelCheckOut(); }} className="bg-blue-500 text-2xl md:text-3xl lg:text-4xl hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"><MdOutlineShoppingCartCheckout /></button>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>

    );
};

export default CheckOut;
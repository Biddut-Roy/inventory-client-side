import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";



const Summary = () => {
    return (
        <div className=" min-h-screen bg-gradient-to-r from-green-200 via-green-300 to-blue-500">
            <Helmet>
                <title>IMS || Summary</title>
                <link rel="canonical" />
            </Helmet>
            <div className="bg-gradient-to-r from-green-200 via-green-300 to-blue-500">
                <div className=" grid grid-cols-1 md:grid-cols-3 gap-5 w-11/12 mx-auto items-center py-10 md:pt-10">

                    <NavLink to={`/dashboard/subscription/${10}`}>
                        <div className="stat text-gray-700  border-2 bg-slate-300 rounded-lg">
                            <div className="stat-title text-black" >Bronze</div>
                            <div className="stat-value">10$</div>
                            <div className="stat-desc text-black">200 Product</div>
                        </div>
                    </NavLink>

                    <NavLink to={`/dashboard/subscription/${20}`}>
                        <div className="stat text-gray-700 border-2 bg-yellow-200 rounded-lg">

                            <div className="stat-title text-black">Platinum</div>
                            <div className="stat-value">20$</div>
                            <div className="stat-desc text-black ">450 Product</div>
                        </div>
                    </NavLink>

                    <NavLink to={`/dashboard/subscription/${50}`}>
                        <div className="stat text-gray-700 border-2 bg-orange-300 rounded-lg">
                            <div className="stat-title text-black">Gold</div>
                            <div className="stat-value">50$</div>
                            <div className="stat-desc text-black">1500 Product</div>
                        </div>
                    </NavLink>

                </div>
                {/* table */}
                <div className="w-11/12 mx-auto">
                    <table className="min-w-full border-collapse block md:table ">
                        <thead className="block md:table-header-group">
                            <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">

                                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Name</th>
                                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Quantity</th>
                                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Discount</th>

                            </tr>
                        </thead>

                        <tbody className="block md:table-row-group text-black">
                            <tr className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">

                                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Name</span>product?.product_name</td>

                                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Quantity</span>product.quantity</td>

                                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Discount</span>product.discount %</td>

                            </tr>
                        </tbody>

                    </table>

                </div>
            </div>
        </div>
    );
};

export default Summary;
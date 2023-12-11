import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";

const Subscription = () => {
    return (

        <div className=" min-h-screen bg-gradient-to-r from-green-200 via-green-300 to-blue-500">
            <Helmet>
                <title>IMS || Subscription</title>
                <link rel="canonical" />
            </Helmet>
            <div className="bg-gradient-to-r from-green-200 via-green-300 to-blue-500">
                <div className=" grid grid-cols-1 md:grid-cols-3 gap-5 w-11/12 mx-auto items-center py-10 md:pt-24">

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
                            <div className="stat-desc text-black text-xs">450 Product</div>
                        </div>
                    </NavLink>

                    <NavLink to={`/dashboard/subscription/${50}`}>
                        <div className="stat text-gray-700 border-2 bg-orange-300 rounded-lg">
                            <div className="stat-title text-black">Gold</div>
                            <div className="stat-value">50$</div>
                            <div className="stat-desc text-black text-xs">1500 Product</div>
                        </div>
                    </NavLink>

                </div>
            </div>
        </div>
    );
};

export default Subscription;
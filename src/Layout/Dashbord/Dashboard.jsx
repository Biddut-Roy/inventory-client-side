import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";

const Dashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const  [isAdmin] = useAdmin()
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <label onClick={toggleSidebar} className="btn btn-circle swap swap-rotate md:hidden lg:hidden">

                <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
                <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
            </label>
            <div className=" w-11/12 mx-auto md:my-10 lg:my-10 bg-blue-100 flex">
                <div className=" flex md:hidden lg:hidden">
                    <div className={isSidebarOpen ? "-ml-36 hidden" : " bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 w-22 md:w-64 lg:w-64 min-h-screen bg-gray-300"}>
                        {
                            isAdmin?.isAdmin ?
                                  <ul className=" menu text-black">
                                  <li><Link>Admin home</Link></li>
                                  <li><Link to={'/dashboard/manage'}>Manage Shop</Link></li>
                                  <li><Link to={'/dashboard/admin/Summary'}>Sale-Summary</Link></li>
                                  <li><Link to={'/dashboard/Review'}>Manage Booking</Link></li>
                                  <li><Link to={'/dashboard/Users'}>All user</Link></li>
                               </ul>
                               :
                            <ul className=" menu text-black">
                               <li>Shop Manager</li>
                            <li><Link to={'/dashboard'}>Add Product</Link></li>
                            <li><Link to={'/dashboard/product'}>All Product</Link></li>
                            <li><Link to={'/dashboard/Collection'}>Sales-Collection</Link></li>
                            <li><Link to={'/dashboard/checkOut'}>Check-Out</Link></li>
                            <li><Link to={'/dashboard/subscription'}>subscription</Link></li>
                            <li><Link to={'/dashboard/Summary'}>Summary</Link></li>
                            </ul>
                        }

                        {/* shear content */}
                        <div className="divider bg-blue-400"></div>
                        <ul className=" menu text-black ">
                            <li><Link to={'/'}>Home</Link></li>
                            <li><Link to={'/'}>Contact</Link></li>
                        </ul>

                    </div>
                </div>

                {/* hidden phone */}

                <div className=" hidden md:flex md:flex-col lg:flex lg:flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 w-64 min-h-screen bg-gray-300">
                    {
                        isAdmin?.isAdmin ?
                              <ul className=" menu text-black">
                                <li><Link>Admin home</Link></li>
                              <li><Link to={'/dashboard/manage'}>Manage Shop</Link></li>
                              <li><Link to={'/dashboard/admin/Summary'}>Sale-Summary</Link></li>
                              <li><Link to={'/dashboard/Review'}>Manage Booking</Link></li>
                              <li><Link to={'/dashboard/Users'}>All user</Link></li>
                           </ul>
                           :
                        <ul className=" menu text-black">
                            <li className=" mb-3">Shop Manager</li>
                            <li><Link  to={'/dashboard'}>Add Product</Link></li>
                            <li><Link to={'/dashboard/product'}>All Product</Link></li>
                            <li><Link to={'/dashboard/Collection'}>Sales-Collection</Link></li>
                            <li><Link to={'/dashboard/checkOut'}>Check-Out</Link></li>
                            <li><Link to={'/dashboard/subscription'}>subscription</Link></li>
                            <li><Link to={'/dashboard/Summary'}>Summary</Link></li>

                        </ul>
                    }

                    {/* shear content */}
                    <div className="divider bg-blue-400"></div>
                    <ul className=" menu text-black ">
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/'}>Contact</Link></li>
                    </ul>

                </div>

                <div className=" flex-1 min-h-screen">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
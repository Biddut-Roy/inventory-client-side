import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

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

                            //       <ul className=" menu text-black">
                            //       <li><NavLink to={'/dashboard/Admin'}>Admin home</NavLink></li>
                            //       <li><NavLink to={'/dashboard/AddItem'}>Add item</NavLink></li>
                            //       <li><NavLink to={'/dashboard/manage'}>Manage Item</NavLink></li>
                            //       <li><NavLink to={'/dashboard/Review'}>Manage Booking</NavLink></li>
                            //       <li><NavLink to={'/dashboard/Users'}>All user</NavLink></li>
                            //    </ul>
                            //    :
                            <ul className=" menu text-black">
                               <li>Shop Manager</li>
                            <li><NavLink to={'/dashboard/add'}>Add Product</NavLink></li>
                            <li><NavLink to={'/dashboard/product'}>All Product</NavLink></li>
                            <li><NavLink to={'/dashboard/Collection'}>Sales-Collection</NavLink></li>
                            <li><NavLink to={'/dashboard/checkOut'}>Check-Out</NavLink></li>
                            <li><NavLink to={'/dashboard/subscription'}>subscription</NavLink></li>
                            </ul>
                        }

                        {/* shear content */}
                        <div className="divider bg-blue-400"></div>
                        <ul className=" menu text-black ">
                            <li><NavLink to={'/'}>Home</NavLink></li>
                            <li><NavLink to={'/'}>Contact</NavLink></li>
                        </ul>

                    </div>
                </div>

                {/* hidden phone */}

                <div className=" hidden md:flex md:flex-col lg:flex lg:flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 w-64 min-h-screen bg-gray-300">
                    {

                        //       <ul className=" menu text-black">
                        //       <li><NavLink to={'/dashboard/Admin'}>Admin home</NavLink></li>
                        //       <li><NavLink to={'/dashboard/AddItem'}>Add item</NavLink></li>
                        //       <li><NavLink to={'/dashboard/manage'}>Manage Item</NavLink></li>
                        //       <li><NavLink to={'/dashboard/Review'}>Manage Booking</NavLink></li>
                        //       <li><NavLink to={'/dashboard/Users'}>All user</NavLink></li>
                        //    </ul>
                        //    :
                        <ul className=" menu text-black">
                            <li className=" mb-3">Shop Manager</li>
                            <li><NavLink  to={'/dashboard/add'}>Add Product</NavLink></li>
                            <li><NavLink to={'/dashboard/product'}>All Product</NavLink></li>
                            <li><NavLink to={'/dashboard/Collection'}>Sales-Collection</NavLink></li>
                            <li><NavLink to={'/dashboard/checkOut'}>Check-Out</NavLink></li>
                            <li><NavLink to={'/dashboard/subscription'}>subscription</NavLink></li>

                        </ul>
                    }

                    {/* shear content */}
                    <div className="divider bg-blue-400"></div>
                    <ul className=" menu text-black ">
                        <li><NavLink to={'/'}>Home</NavLink></li>
                        <li><NavLink to={'/'}>Contact</NavLink></li>
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
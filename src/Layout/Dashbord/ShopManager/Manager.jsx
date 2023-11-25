// import { useState } from "react";
import {  NavLink, Outlet } from "react-router-dom";

const Manager = () => {
    // const [isSidebarOpen, setSidebarOpen] = useState(false);

    // const toggleSidebar = () => {
    //     setSidebarOpen(!isSidebarOpen);
    // };
    return (
        <div className=" w-11/12 mx-auto my-10 bg-slate-200 flex">
        <div className=" w-64 min-h-screen bg-gray-300 ">
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
               <li><NavLink to={'/dashboard/userHome'}>Shop Manager</NavLink></li>
               <li><NavLink to={'/dashboard/card'}>Shop card</NavLink></li>
               <li><NavLink to={'/dashboard'}>Add Product</NavLink></li>
               <li><NavLink to={'/dashboard/history'}>payment History</NavLink></li>
               <li><NavLink to={'/dashboard/Review'}>Add review</NavLink></li>
               <li><NavLink to={'/dashboard/booking'}>Booking</NavLink></li>
            </ul>
            }
            
            {/* shear content */}
            <div className="divider bg-blue-400"></div>
            <ul className=" menu text-black">
               <li><NavLink to={'/'}>Home</NavLink></li>
               <li><NavLink to={'/'}>Contact</NavLink></li>
            </ul>
            
        </div>

        <div  className=" flex-1">
            <Outlet></Outlet>
        </div>
    </div>
    );
};

export default Manager;
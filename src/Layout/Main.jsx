import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../pages/ShearPage/Navbar/Navbar";
import Footer from "../pages/ShearPage/Footer/Footer";


const Main = () => {
    const location = useLocation()
  const HIdden =  location.pathname.includes('login') || location.pathname.includes('register')
    return (
        <div className=" w-11/12 mx-auto bg-slate-200">
           {
            HIdden || <Navbar />
           } 
            <div className=' my-10 min-h-[calc(100vh-98px)]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;
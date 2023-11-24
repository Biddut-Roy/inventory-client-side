import { Outlet } from "react-router-dom";
import Navbar from "../pages/ShearPage/Navbar/Navbar";
import Footer from "../pages/ShearPage/Footer/Footer";


const Main = () => {
    return (
        <div>
            <Navbar />
            <div className='pt-24 min-h-[calc(100vh-98px)]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;
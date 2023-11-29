
import Marquee from "react-fast-marquee";
import About from "../About us/About";
import Banner from "../Banner/Banner";
import MapBox from "../Map/Mapbox";
import Partner from "../Partner Brand/Partner";
import Review from "../Testimonial/Review";
import { Helmet } from "react-helmet-async";



const Home = () => {
    return (
        <div >
            <Helmet>
                <title>IMS || Home</title>
                <link rel="canonical" />
            </Helmet>
            <div className=" flex  m-2">
            <h1 className=" text-black my-5 font-bold">Notice: </h1>
            <Marquee>
                <h1 className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">More than 100 products will be entered in your shop this month, there will be a special bonus for you.</h1>
            </Marquee>
            </div>
             <Banner />
            <About />
            <Partner />
            <div className="mt-10">
                <MapBox />
            </div>
            <div>
                <Review />
            </div>
        </div>
    );
};

export default Home;
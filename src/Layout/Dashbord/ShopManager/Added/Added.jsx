import { Link } from "react-router-dom";



const Added = () => {
   

    return (
        <div >
            <div className=" flex flex-col md:flex-row lg:flex-row justify-between mt-20 md:mx-12 lg:mx-20 border-y-2 border-r-2 border-black border-solid ">
                <div className=" text-black font-bold text-center">Total 6 Product Added</div>
                <Link to={'/dashboard/added'}><button className="btn md:btn-primary lg:btn-wide btn-sm bg-blue-700 ">Add Product</button></Link>
            </div>
        </div>
    );
};

export default Added;
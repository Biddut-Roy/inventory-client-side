// import usePublicAxios from "../../Hooks/usePublicAxios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


const CreateShop = () => {
    // const publicAxios = usePublicAxios()
    const SecureAxios = useAxiosSecure()
    const navigate = useNavigate()
    const { user } = useAuth()
    // const IMG_IMG_HOSTING = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_KEY_IMGBB}`
    const { register, handleSubmit, reset } = useForm()



    const onSubmit = async (data) => {
        // const imagFile = { image: data.image[0] }
        // const res = await publicAxios.post(IMG_IMG_HOSTING, imagFile, {
        //     headers: { "content-type": "multipart/form-data" }
        // })

        // if (res.data.success) {
            const shopDetails = {
                roll: "shop-admin" ,
                description: data.description,
                location: data.location,
                email: user?.email,
                shop_name: data.Name,
                name: user?.displayName,
                image: "https://i.ibb.co/QQpC4V1/proinvnew.webp"
            }

            const menuRes = await SecureAxios.post('/shop-admin', shopDetails);
    
            if (menuRes.data.store) {
                toast.success('Already have a account')
                reset();
                navigate('/')
            }
            if (menuRes.data._id) {
                Swal.fire("Your Shop Created");
                reset();
                navigate('/dashboard')
            }
        // }
    }

    return (
        <div className=" w-10/12 mx-auto">
            <Helmet>
                <title>IMS || Shop</title>
                <link rel="canonical" />
            </Helmet>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className=" md:w-10/12 lg:w-10/12 mx-auto">
                    <div className=" flex gap-6">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text"> Your Shop Name*</span>
                            </label>
                            <input type="text" placeholder="Shop Name" {...register("Name")} className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Shop Location*</span>
                            </label>
                            <input type="text" placeholder="Shop Location" {...register("location")} className="input input-bordered w-full" />
                        </div>
                       
                    </div>
                    <div className=" flex gap-6">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text ">Owner Name*</span>
                            </label>
                            <h1 className=" text-xl md:text-2xl lg:text-3xl font-semi">{user.displayName}</h1>
                        </div>
                         <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email*</span>
                            </label>
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-semi">{user.email}</h1>
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Shop info*</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-24" {...register("description")} placeholder="Description"></textarea>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Shop Logo</span>
                        </label>
                        <input type="file" {...register("image")} className="file-input w-full max-w-xs" />
                    </div>
                    <div className=" text-center mt-5">
                        <button className=" btn btn-primary bg-blue-700 btn-md"><input type="submit" value="Submit" /></button>
                    </div>
                </div>

            </form>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default CreateShop;
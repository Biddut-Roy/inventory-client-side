import Swal from "sweetalert2";
import usePublicAxios from "../../../../Hooks/usePublicAxios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";



const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const publicAxios = usePublicAxios()
    const SecureAxios = useAxiosSecure()
    const IMG_IMG_HOSTING = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_KEY_IMGBB}`
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const { isPending, error, refetch, data: update = [] } = useQuery({
        queryKey: ['product-update'],
        queryFn: async () => {
            const res = await SecureAxios.get(`/dashboard/updateProduct/${id}`)
            return res.data
        }
    })
    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message

    const { product_name, location, profit, cost, description, discount, quantity, _id } = update
    refetch()

    const onSubmit = async (data) => {
        const cost = parseInt(data?.Cost)
        const profit = parseFloat(data?.Profit_Margin)
        const SellingPrice = parseFloat(cost + ((cost * 7.5) / 100) + ((cost * profit) / 100))
        const imgFile = { image: data.image[0] }
        const res = await publicAxios.post(IMG_IMG_HOSTING, imgFile, {
            headers: { "content-type": "multipart/form-data" }
        })
        if (res.data.success) {
            const productData = {
                sellingPrice: SellingPrice,
                cost: cost,
                profit: profit,
                discount: data.Discount,
                quantity: data.Quantity,
                product_name: data.Product_Name,
                location: data.Location,
                description: data.Description,
                photo: res.data?.data?.display_url
            }
            SecureAxios.patch(`/update-product/${_id}`, productData)
                .then(res => {
                    console.log(res.data);
                    if (res.data.modifiedCount > 0) {
                        reset()
                        navigate("/dashboard")
                        Swal.fire({
                            title: "Your Product update information update ",
                            showClass: {
                                popup: `
                                                animate__animated
                                                animate__fadeInUp
                                                animate__faster
                                            `
                            },
                            hideClass: {
                                popup: `
                                            animate__animated
                                            animate__fadeOutDown
                                            animate__faster
                                        `
                            }
                        });

                    }
                })
        }
    }
    return (
        <div>
            <Helmet>
                <title>IMS || Update</title>
                <link rel="canonical" />
            </Helmet>
            <h1 className=" text-2xl font-bold text-blue-700 mt-10 text-center">Update This Product </h1>
            <form onSubmit={handleSubmit(onSubmit)} className=" ">
                <div className="w-10/12 md:w-10/12 lg:w-10/12 my-14 mx-auto grid grid-cols-2 gap-5">
                    <div className="form-control">
                        <label className="label">
                            <span className=" label-text text-black">Product Name</span>
                        </label>
                        <input type="text" className="pl-4" defaultValue={product_name} {...register("Product_Name", { required: true, maxLength: 80 })} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className=" label-text text-black">Quantity</span>
                        </label>
                        <input type="number" className="pl-4 " defaultValue={quantity} {...register("Quantity", { required: true, maxLength: 100 })} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className=" label-text text-black">Location</span>
                        </label>
                        <input type="text" className="pl-4 " defaultValue={location} {...register("Location", { required: true })} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className=" label-text text-black">product Cost</span>
                        </label>
                        <input type="number" className="pl-4 " defaultValue={cost} {...register("Cost", { required: true })} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className=" label-text text-black">Profit Margin (%)</span>
                        </label>
                        <input type="number" className="pl-4 " defaultValue={profit}  {...register("Profit_Margin", { required: true })} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className=" label-text text-black">Discount (%)</span>
                        </label>
                        <input type="number" className="pl-4 " defaultValue={discount} {...register("Discount", { required: true })} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className=" label-text text-black">Description</span>
                        </label>
                        <textarea defaultValue={description} {...register("Description", { required: true })} />
                    </div>
                    <div className="form-control">
                        <label className="label ">
                            <span className=" label-text text-black">product img</span>
                        </label>
                        <input type="file" {...register("image", { required: true })} className=" input-bordered" />
                        {errors.firstName?.type === "image" && (
                            <p className=" text-red-400">photo is required</p>
                        )}
                    </div>
                    <div className="form-control flex justify-center mt-8">
                        <input className=" btn btn-primary bg-blue-700 btn-sm" type="submit" value='Add Product' />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Update;
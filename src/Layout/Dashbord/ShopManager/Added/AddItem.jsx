import { useForm } from "react-hook-form";
import usePublicAxios from "../../../../Hooks/usePublicAxios";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddItem = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const publicAxios = usePublicAxios()
    const IMG_IMG_HOSTING = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_KEY_IMGBB}`
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const { isPending, error, data: store = {} } = useQuery({
        queryKey: ['shop-data'],
        queryFn: async () => {
            const res = await publicAxios.get(`/shop-data/${user?.email}`)
            return res.data
        }
    })
    console.log(store?._id);
    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message

    const onSubmit = async (data) => {
        const cost = parseInt(data?.Cost)
        const profit = parseFloat(data?.Profit_Margin)
        const SellingPrice = parseFloat( cost+ (cost* 7.5 / 100) + (cost* profit / 100 ))
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();
        const currentDateStr = `${currentYear}/${currentMonth}/${currentDay}`;
        console.log({SellingPrice , currentDateStr});
        const imgFile = { image: data.image[0] }
        const res = await publicAxios.post(IMG_IMG_HOSTING, imgFile, {
            headers: { "content-type": "multipart/form-data" }
        })
        if (res.data.success) {
            const productData = {
                saleCount: 0 ,
                date: currentDateStr ,
                user_email: user?.email,
                shop_Id: store?._id ,
                shop_Name: store?.shop_name,
                sellingPrice: SellingPrice,
                cost: cost ,
                profit: profit,
                discount: data.Discount ,
                quantity: data.Quantity,
                product_name: data.Product_Name ,
                location: data.Location ,
                description: data.Description ,
                photo: res.data?.data?.display_url
            }
            publicAxios.post('/add-product' , productData)
                            .then(res => {
                                if (res.data._id) {
                                    reset()
                                    navigate("/CreateShop")
                                    Swal.fire({
                                        title: "Your Product has been added successfully ",
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
            <form onSubmit={handleSubmit(onSubmit)} className=" ">
                <div className="w-10/12 md:w-10/12 lg:w-10/12 mt-14 mx-auto grid grid-cols-2 gap-5">
                    <div className="form-control">
                        <input type="text" placeholder="Product Name" {...register("Product_Name", { required: true, maxLength: 80 })} />
                    </div>
                    <div className="form-control">
                        <input type="number" placeholder="Quantity" {...register("Quantity", { required: true, maxLength: 100 })} />
                    </div>
                    <div className="form-control">
                        <input type="text" placeholder="Location" {...register("Location", { required: true })} />
                    </div>
                    <div className="form-control">
                        <input type="number" placeholder="Cost" {...register("Cost", { required: true })} />
                    </div>
                    <div className="form-control">
                        <input type="number" placeholder="Profit Margin (%)" {...register("Profit_Margin", { required: true })} />
                    </div>
                    <div className="form-control">
                        <input type="number" placeholder="Discount (%)" {...register("Discount", { required: true })} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Description</span>
                        </label>
                        <textarea {...register("Description", { required: true })} />
                    </div>
                    <div className="form-control">
                        <label className="label ">
                            <span className="label-text text-black">product img</span>
                        </label>
                        <input type="file" {...register("image", { required: true })} className="input-bordered" />
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

export default AddItem;
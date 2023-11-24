import usePublicAxios from "../../Hooks/usePublicAxios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const CreateShop = () => {
    const publicAxios = usePublicAxios()
    const SecureAxios = useAxiosSecure()
    const IMG_UPDATE_KEY = import.meta.env.VITE_API_KEY_IMGBB
    const IMG_HOSTING_API = `https://api.imgbb.com/1/upload?key=${IMG_UPDATE_KEY}`
    const { register, handleSubmit, reset } = useForm()

    const onSubmit = async (data) => {
        console.log(data);
        const imagFile = { image: data.image[0] }
        const res = await publicAxios.post(IMG_HOSTING_API, imagFile, {
            headers: { "content-type": "multipart/form-data" }
        })
        if (res.data.success) {
            const menuitem = {
                name: data.Name,
                category: data.item,
                recipe: data.description,
                price: data.location,
                Email: data.Email,
                image: res.data.data.display_url
            }
            console.log(menuitem);
            const menuRes = await SecureAxios.post('', menuitem);
            if (menuRes.data.insertedId) {
                Swal.fire("added a item to the menu");
                reset();
            }
        }
    }

    return (
        <div className=" w-10/12 mx-auto">
            
            <form onSubmit={handleSubmit(onSubmit)}>
                 <div className=" flex gap-6">
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text"> Your Shop Name*</span>
                        </label>
                        <input type="text" placeholder="Shop Name" {...register("Name")} className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email*</span>
                        </label>
                        <input type="text" placeholder="Email" {...register("location")} className="input input-bordered w-full" />
                    </div>
                </div>
                <div className=" flex gap-6">
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Owner Name*</span>
                        </label>
                        <input type="text" placeholder="Owner" {...register("lOwner")} className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Shop Location*</span>
                        </label>
                        <input type="text" placeholder="Shop Location" {...register("location")} className="input input-bordered w-full" />
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
                <button className=""><input type="submit" value="Submit" /></button>
            </form>
        </div>
    );
};

export default CreateShop ;
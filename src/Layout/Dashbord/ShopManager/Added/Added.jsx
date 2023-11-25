import { useForm } from "react-hook-form";


const Added = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);
    return (
        <div>
            <div className=" flex justify-between mt-20 mx-20 border-y-2 border-r-2 border-black border-solid ">
                <div className=" text-black font-bold ">Total 6 Product Added</div>
                <button onClick={() => document.getElementById('addModal').showModal()} className="btn btn-wide btn-sm bg-blue-700 ">Add Product</button>
            </div>
            <div>
                <dialog id="addModal" className="modal modal-bottom sm:modal-middle ">
                    <div className="modal-box">
                        <form className="md:w-10/12 lg:w-10/12 mx-auto grid grid-cols-3 gap-5" onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" placeholder="Product Name" {...register("Product_Name", { required: true, maxLength: 80 })} />
                            <input type="text" placeholder="Product Quantity" {...register("Product_Quantity", { required: true, maxLength: 100 })} />
                            <input type="text" placeholder="Product Location" {...register("Product_Location", { required: true, pattern: /^\S+@\S+$/i })} />
                            <input type="number" placeholder="ProductionCost" {...register("ProductionCost", { required: true, maxLength: 12 })} />
                            <input type="number" placeholder="Profit Margin" {...register("Profit_Margin", {required: true})} />
                            <input type="number" placeholder="Discount" {...register("Discount", {required: true})} />
                            <textarea {...register("Product Description", {required: true})} />

                            <input className=" btn btn-primary bg-blue-700 btn-md" type="submit" value={'Add Product'}/>
                        </form>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default Added;
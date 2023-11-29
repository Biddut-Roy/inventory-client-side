import { Toaster } from "react-hot-toast";
import { AiTwotoneNotification } from "react-icons/ai";
import usePublicAxios from "../../../../Hooks/usePublicAxios";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useState } from "react";



const Manage = () => {
    const publicAxios = usePublicAxios()
    const SecureAxios = useAxiosSecure()
    const [emailValue, setEmailValue] = useState('');
    const { isPending, error, refetch, data: store = [] } = useQuery({
        queryKey: ['all-store'],
        queryFn: async () => {
            const res = await publicAxios.get('/all-shop-data')
            return res.data?.result
        }
    })
    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message
    refetch()


const handelSubmit = e =>{
    e.preventDefault();
    const form = e.target ;
    const mail = form.email.value;
    const field = form.message.value;
    const data ={mail , field}

    SecureAxios.post('/send-mail', data )
      .then(function (response) {
        console.log(response);
      })
}
const handleOpenModal = (product) => {
    setEmailValue(product.email);
    document.getElementById('my_modal_4').showModal();
  };

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-200 via-green-300 to-blue-500">
            <Helmet>
                <title>IMS || shop_Manage</title>
                <link rel="canonical" />
            </Helmet>
            <table className="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                    <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">

                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Photo</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Name</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Limit</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Description</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Action</th>

                    </tr>
                </thead>
                {
                    store?.map(product => <tbody key={product._id} className="block  md:table-row-group text-black">
                        <tr className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">

                            <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">
                            </span><div className="flex items-center">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={product?.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </div></td>

                            <td className="p-2  md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Name:</span>{product?.shop_name}</td>

                            <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">limit:</span>{product.limit}</td>

                            <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">description:</span>{product.description}</td>

                            <td className=" text-center mt-5  md:mr-10 lg:mr-10 md:mt-10 lg:mt-10">
                                <button  onClick={() => handleOpenModal(product)} className="bg-blue-500 text-2xl md:text-3xl lg:text-4xl hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"><AiTwotoneNotification /></button></td>

                            <dialog id="my_modal_4" className="modal  w-10/12 mx-auto">
                                <div className="modal-box w-11/12 max-w-10/12 bg-slate-300">
                                    <form onSubmit={handelSubmit} className=" flex flex-col gap-5">
                                        <input type="email" name="email" id="" value={emailValue} placeholder="email" className=" bg-blue-100 text-black border-solid border-2 p-5  font-bold" />
                                        <textarea name="message" id="" cols="20" rows="7" placeholder="type message" className=" bg-blue-100 text-black border-solid border-2 text-2xl "></textarea>
                                        <input type="submit" value="Send" className=" btn btn-sm bg-blue-700" />
                                    </form>
                                    <div className="modal-action">        
                                        <form method="dialog">
                                            <button className="btn">Close</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </tr>
                    </tbody>)
                }
            </table>

            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default Manage;